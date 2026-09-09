/*
  Warnings:

  - Made the column `architectId` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "architectId" SET NOT NULL;
