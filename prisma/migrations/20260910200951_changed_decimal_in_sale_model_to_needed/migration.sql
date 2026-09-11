/*
  Warnings:

  - Made the column `amount` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "amount" SET NOT NULL;
