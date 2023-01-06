/*
  Warnings:

  - You are about to drop the column `qr_code` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movements" ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "qr_code";
