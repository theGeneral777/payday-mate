CREATE TABLE `lender_offers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lenderId` int NOT NULL,
	`amountCents` int NOT NULL,
	`availableUntil` timestamp NOT NULL,
	`minimumTrustScore` int NOT NULL DEFAULT 50,
	`payIdType` enum('phone','email','abn') NOT NULL,
	`notes` text,
	`status` enum('active','allocated','closed') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lender_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loan_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`borrowerId` int NOT NULL,
	`amountCents` int NOT NULL,
	`repaymentAt` timestamp NOT NULL,
	`trustScoreSnapshot` int NOT NULL,
	`payIdType` enum('phone','email','abn') NOT NULL,
	`notes` text,
	`status` enum('open','matched','repaid','cancelled') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`offerId` int NOT NULL,
	`borrowerId` int NOT NULL,
	`lenderId` int NOT NULL,
	`amountCents` int NOT NULL,
	`repaymentAt` timestamp NOT NULL,
	`status` enum('agreed','funded','repaid','disputed','cancelled') NOT NULL DEFAULT 'agreed',
	`borrowerConfirmedAt` timestamp,
	`lenderConfirmedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `matches_id` PRIMARY KEY(`id`),
	CONSTRAINT `matches_request_unique` UNIQUE(`requestId`),
	CONSTRAINT `matches_offer_unique` UNIQUE(`offerId`)
);
--> statement-breakpoint
CREATE TABLE `member_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(120) NOT NULL,
	`state` varchar(64),
	`paydayCycle` enum('weekly','fortnightly','monthly') NOT NULL,
	`intent` enum('borrow','lend','both') NOT NULL,
	`bio` text,
	`trustScore` int NOT NULL DEFAULT 50,
	`payIdType` enum('phone','email','abn'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `member_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `member_profiles_user_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tier` enum('free','silver','bronze','gold','vip') NOT NULL DEFAULT 'free',
	`status` enum('active','past_due','cancelled') NOT NULL DEFAULT 'active',
	`externalCustomerId` varchar(128),
	`externalSubscriptionId` varchar(128),
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`endsAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `memberships_id` PRIMARY KEY(`id`),
	CONSTRAINT `memberships_user_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `repayment_confirmations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`confirmedBy` int NOT NULL,
	`note` text,
	`confirmedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `repayment_confirmations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterId` int NOT NULL,
	`reportedUserId` int,
	`matchId` int,
	`reason` varchar(120) NOT NULL,
	`details` text,
	`status` enum('open','reviewing','resolved','dismissed') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE INDEX `lender_offers_status_index` ON `lender_offers` (`status`);--> statement-breakpoint
CREATE INDEX `lender_offers_lender_index` ON `lender_offers` (`lenderId`);--> statement-breakpoint
CREATE INDEX `loan_requests_status_index` ON `loan_requests` (`status`);--> statement-breakpoint
CREATE INDEX `loan_requests_borrower_index` ON `loan_requests` (`borrowerId`);--> statement-breakpoint
CREATE INDEX `matches_borrower_index` ON `matches` (`borrowerId`);--> statement-breakpoint
CREATE INDEX `matches_lender_index` ON `matches` (`lenderId`);--> statement-breakpoint
CREATE INDEX `repayment_confirmations_match_index` ON `repayment_confirmations` (`matchId`);--> statement-breakpoint
CREATE INDEX `reports_status_index` ON `reports` (`status`);