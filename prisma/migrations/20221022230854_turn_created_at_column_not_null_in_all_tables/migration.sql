/*
  Warnings:

  - Made the column `created_at` on table `alerts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `buildings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `campuses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `disease_contaminations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `health_tips` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `movements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "alerts" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "buildings" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "campuses" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "disease_contaminations" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "health_tips" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "movements" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;
