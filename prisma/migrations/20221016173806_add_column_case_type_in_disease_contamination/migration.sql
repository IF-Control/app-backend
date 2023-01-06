/*
  Warnings:

  - Added the required column `case_type` to the `disease_contaminations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disease_contaminations" ADD COLUMN     "case_type" TEXT NOT NULL;
