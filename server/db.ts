import { desc, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, lenderOffers, loanRequests, matches, memberProfiles, memberships, repaymentConfirmations, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId, lastSignedIn: user.lastSignedIn ?? new Date() };
  const updateSet: Record<string, unknown> = { lastSignedIn: values.lastSignedIn };
  for (const field of ["name", "email", "loginMethod"] as const) {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(memberProfiles).where(eq(memberProfiles.userId, userId)).limit(1);
  return result[0];
}

export async function getMembership(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(memberships).where(eq(memberships.userId, userId)).limit(1);
  return result[0];
}

export async function getDashboardData(userId: number) {
  const db = await getDb();
  if (!db) return { profile: undefined, membership: undefined, requests: [], offers: [], matches: [] };
  const [profile, membership, requests, offers, userMatches] = await Promise.all([
    getProfile(userId), getMembership(userId),
    db.select().from(loanRequests).where(or(eq(loanRequests.borrowerId, userId), eq(loanRequests.status, "open"))).orderBy(desc(loanRequests.createdAt)).limit(50),
    db.select().from(lenderOffers).where(or(eq(lenderOffers.lenderId, userId), eq(lenderOffers.status, "active"))).orderBy(desc(lenderOffers.createdAt)).limit(50),
    db.select().from(matches).where(or(eq(matches.borrowerId, userId), eq(matches.lenderId, userId))).orderBy(desc(matches.createdAt)).limit(50),
  ]);
  return { profile, membership, requests, offers, matches: userMatches };
}

export async function confirmRepayment(matchId: number, userId: number, note?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(repaymentConfirmations).values({ matchId, confirmedBy: userId, note: note ?? null });
  return { success: true } as const;
}
