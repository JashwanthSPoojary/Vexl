/*
  Warnings:

  - Added the required column `envs` to the `Deployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deployment" ADD COLUMN     "envs" JSONB NOT NULL;
