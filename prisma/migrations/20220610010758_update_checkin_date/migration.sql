-- AlterTable
ALTER TABLE "movements" ALTER COLUMN "checkin_date" DROP NOT NULL,
ALTER COLUMN "checkin_date" DROP DEFAULT;
