/*
  Warnings:

  - Added the required column `buildId` to the `Deployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deployment" ADD COLUMN     "buildId" TEXT NOT NULL;
