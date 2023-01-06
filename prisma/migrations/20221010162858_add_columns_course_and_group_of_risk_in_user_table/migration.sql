-- AlterTable
ALTER TABLE "users" ADD COLUMN     "course" TEXT,
ADD COLUMN     "group_of_risk" BOOLEAN NOT NULL DEFAULT false;
