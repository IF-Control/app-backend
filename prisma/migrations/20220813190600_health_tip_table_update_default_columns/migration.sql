/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `health_tips` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "health_tips" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "health_tips_order_key" ON "health_tips"("order");
