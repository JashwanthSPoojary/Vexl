/*
  Warnings:

  - Changed the type of `status` on the `Deployment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('active', 'queued', 'failed');

-- AlterTable
ALTER TABLE "Deployment" DROP COLUMN "status",
ADD COLUMN     "status" "DeploymentStatus" NOT NULL;
