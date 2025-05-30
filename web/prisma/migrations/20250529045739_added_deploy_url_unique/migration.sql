/*
  Warnings:

  - A unique constraint covering the columns `[deployUrl]` on the table `Deployment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `deployUrl` on table `Deployment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deployment" ALTER COLUMN "deployUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Deployment_deployUrl_key" ON "Deployment"("deployUrl");
