import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDashboardData, getDb, getMembership, getProfile, confirmRepayment } from "./db";
import { lenderOffers, loanRequests, matches, memberProfiles, memberships, reports } from "../drizzle/schema";

const paydayCycle = z.enum(["weekly", "fortnightly", "monthly"]);
const intent = z.enum(["borrow", "lend", "both"]);
const payIdType = z.enum(["phone", "email", "abn"]);

function assertDb(db: Awaited<ReturnType<typeof getDb>>) {
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
  return db;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  member: router({
    dashboard: protectedProcedure.query(({ ctx }) => getDashboardData(ctx.user.id)),
    profile: protectedProcedure.query(({ ctx }) => getProfile(ctx.user.id)),
    membership: protectedProcedure.query(({ ctx }) => getMembership(ctx.user.id)),
    saveProfile: protectedProcedure.input(z.object({
      displayName: z.string().min(2).max(120),
      state: z.string().max(64).optional(),
      paydayCycle,
      intent,
      bio: z.string().max(500).optional(),
      payIdType: payIdType.optional(),
    })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      await db.insert(memberProfiles).values({ userId: ctx.user.id, displayName: input.displayName, state: input.state ?? null, paydayCycle: input.paydayCycle, intent: input.intent, bio: input.bio ?? null, payIdType: input.payIdType ?? null }).onDuplicateKeyUpdate({ set: { displayName: input.displayName, state: input.state ?? null, paydayCycle: input.paydayCycle, intent: input.intent, bio: input.bio ?? null, payIdType: input.payIdType ?? null } });
      return getProfile(ctx.user.id);
    }),
    createRequest: protectedProcedure.input(z.object({ amountCents: z.number().int().min(100).max(500000), repaymentAt: z.coerce.date(), payIdType, notes: z.string().max(500).optional() })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      const profile = await getProfile(ctx.user.id);
      if (!profile) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Complete your profile before posting a request." });
      const [created] = await db.insert(loanRequests).values({ borrowerId: ctx.user.id, amountCents: input.amountCents, repaymentAt: input.repaymentAt, trustScoreSnapshot: profile.trustScore, payIdType: input.payIdType, notes: input.notes ?? null }).$returningId();
      return created;
    }),
    createOffer: protectedProcedure.input(z.object({ amountCents: z.number().int().min(100).max(500000), availableUntil: z.coerce.date(), minimumTrustScore: z.number().int().min(0).max(100), payIdType, notes: z.string().max(500).optional() })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      const profile = await getProfile(ctx.user.id);
      if (!profile) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Complete your profile before posting an offer." });
      const [created] = await db.insert(lenderOffers).values({ lenderId: ctx.user.id, amountCents: input.amountCents, availableUntil: input.availableUntil, minimumTrustScore: input.minimumTrustScore, payIdType: input.payIdType, notes: input.notes ?? null }).$returningId();
      return created;
    }),
    createMatch: protectedProcedure.input(z.object({ requestId: z.number().int(), offerId: z.number().int(), amountCents: z.number().int().min(100).max(500000), repaymentAt: z.coerce.date() })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      const request = (await db.select().from(loanRequests).where(eq(loanRequests.id, input.requestId)).limit(1))[0];
      const offer = (await db.select().from(lenderOffers).where(eq(lenderOffers.id, input.offerId)).limit(1))[0];
      if (!request || !offer || request.status !== "open" || offer.status !== "active") throw new TRPCError({ code: "BAD_REQUEST", message: "That request or offer is no longer available." });
      if (request.borrowerId !== ctx.user.id && offer.lenderId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      if (request.borrowerId === offer.lenderId) throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot match your own request and offer." });
      const [created] = await db.insert(matches).values({ requestId: request.id, offerId: offer.id, borrowerId: request.borrowerId, lenderId: offer.lenderId, amountCents: input.amountCents, repaymentAt: input.repaymentAt }).$returningId();
      await db.update(loanRequests).set({ status: "matched" }).where(eq(loanRequests.id, request.id));
      await db.update(lenderOffers).set({ status: "allocated" }).where(eq(lenderOffers.id, offer.id));
      return created;
    }),
    confirmRepayment: protectedProcedure.input(z.object({ matchId: z.number().int(), note: z.string().max(500).optional() })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      const match = (await db.select().from(matches).where(eq(matches.id, input.matchId)).limit(1))[0];
      if (!match || (match.borrowerId !== ctx.user.id && match.lenderId !== ctx.user.id)) throw new TRPCError({ code: "FORBIDDEN" });
      const result = await confirmRepayment(input.matchId, ctx.user.id, input.note);
      await db.update(matches).set({ status: "repaid" }).where(eq(matches.id, input.matchId));
      await db.update(loanRequests).set({ status: "repaid" }).where(eq(loanRequests.id, match.requestId));
      return result;
    }),
    report: protectedProcedure.input(z.object({ reportedUserId: z.number().int().optional(), matchId: z.number().int().optional(), reason: z.string().min(2).max(120), details: z.string().max(1000).optional() })).mutation(async ({ ctx, input }) => {
      const db = assertDb(await getDb());
      const [created] = await db.insert(reports).values({ reporterId: ctx.user.id, reportedUserId: input.reportedUserId ?? null, matchId: input.matchId ?? null, reason: input.reason, details: input.details ?? null }).$returningId();
      return created;
    }),
  }),
});

export type AppRouter = typeof appRouter;
