/*
  Warnings:

  - Added the required column `branch` to the `Deployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoName` to the `Deployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoOwner` to the `Deployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deployment" ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "githubWebhookId" INTEGER,
ADD COLUMN     "repoName" TEXT NOT NULL,
ADD COLUMN     "repoOwner" TEXT NOT NULL;
