import { boolean, index, int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const memberProfiles = mysqlTable("member_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 120 }).notNull(),
  state: varchar("state", { length: 64 }),
  paydayCycle: mysqlEnum("paydayCycle", ["weekly", "fortnightly", "monthly"]).notNull(),
  intent: mysqlEnum("intent", ["borrow", "lend", "both"]).notNull(),
  bio: text("bio"),
  trustScore: int("trustScore").default(50).notNull(),
  payIdType: mysqlEnum("payIdType", ["phone", "email", "abn"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userUnique: uniqueIndex("member_profiles_user_unique").on(table.userId),
}));

export const memberships = mysqlTable("memberships", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tier: mysqlEnum("tier", ["free", "silver", "bronze", "gold", "vip"]).default("free").notNull(),
  status: mysqlEnum("status", ["active", "past_due", "cancelled"]).default("active").notNull(),
  externalCustomerId: varchar("externalCustomerId", { length: 128 }),
  externalSubscriptionId: varchar("externalSubscriptionId", { length: 128 }),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endsAt: timestamp("endsAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userUnique: uniqueIndex("memberships_user_unique").on(table.userId),
}));

export const loanRequests = mysqlTable("loan_requests", {
  id: int("id").autoincrement().primaryKey(),
  borrowerId: int("borrowerId").notNull(),
  amountCents: int("amountCents").notNull(),
  repaymentAt: timestamp("repaymentAt").notNull(),
  trustScoreSnapshot: int("trustScoreSnapshot").notNull(),
  payIdType: mysqlEnum("payIdType", ["phone", "email", "abn"]).notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["open", "matched", "repaid", "cancelled"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIndex: index("loan_requests_status_index").on(table.status),
  borrowerIndex: index("loan_requests_borrower_index").on(table.borrowerId),
}));

export const lenderOffers = mysqlTable("lender_offers", {
  id: int("id").autoincrement().primaryKey(),
  lenderId: int("lenderId").notNull(),
  amountCents: int("amountCents").notNull(),
  availableUntil: timestamp("availableUntil").notNull(),
  minimumTrustScore: int("minimumTrustScore").default(50).notNull(),
  payIdType: mysqlEnum("payIdType", ["phone", "email", "abn"]).notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["active", "allocated", "closed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIndex: index("lender_offers_status_index").on(table.status),
  lenderIndex: index("lender_offers_lender_index").on(table.lenderId),
}));

export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  requestId: int("requestId").notNull(),
  offerId: int("offerId").notNull(),
  borrowerId: int("borrowerId").notNull(),
  lenderId: int("lenderId").notNull(),
  amountCents: int("amountCents").notNull(),
  repaymentAt: timestamp("repaymentAt").notNull(),
  status: mysqlEnum("status", ["agreed", "funded", "repaid", "disputed", "cancelled"]).default("agreed").notNull(),
  borrowerConfirmedAt: timestamp("borrowerConfirmedAt"),
  lenderConfirmedAt: timestamp("lenderConfirmedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  requestUnique: uniqueIndex("matches_request_unique").on(table.requestId),
  offerUnique: uniqueIndex("matches_offer_unique").on(table.offerId),
  borrowerIndex: index("matches_borrower_index").on(table.borrowerId),
  lenderIndex: index("matches_lender_index").on(table.lenderId),
}));

export const repaymentConfirmations = mysqlTable("repayment_confirmations", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  confirmedBy: int("confirmedBy").notNull(),
  note: text("note"),
  confirmedAt: timestamp("confirmedAt").defaultNow().notNull(),
}, (table) => ({
  matchIndex: index("repayment_confirmations_match_index").on(table.matchId),
}));

export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  reporterId: int("reporterId").notNull(),
  reportedUserId: int("reportedUserId"),
  matchId: int("matchId"),
  reason: varchar("reason", { length: 120 }).notNull(),
  details: text("details"),
  status: mysqlEnum("status", ["open", "reviewing", "resolved", "dismissed"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIndex: index("reports_status_index").on(table.status),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type MemberProfile = typeof memberProfiles.$inferSelect;
export type Membership = typeof memberships.$inferSelect;
export type LoanRequest = typeof loanRequests.$inferSelect;
export type LenderOffer = typeof lenderOffers.$inferSelect;
export type Match = typeof matches.$inferSelect;
