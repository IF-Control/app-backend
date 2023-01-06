/*
  Warnings:

  - You are about to drop the column `order` on the `health_tips` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image]` on the table `health_tips` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "health_tips_order_key";

-- AlterTable
ALTER TABLE "health_tips" DROP COLUMN "order";

-- CreateIndex
CREATE UNIQUE INDEX "health_tips_image_key" ON "health_tips"("image");
