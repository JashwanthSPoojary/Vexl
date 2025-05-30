/*
  Warnings:

  - A unique constraint covering the columns `[buildId]` on the table `Deployment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Deployment" ADD COLUMN     "alternativeDeployUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Deployment_buildId_key" ON "Deployment"("buildId");
