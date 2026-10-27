/*
  Warnings:

  - The values [ARCHIVED] on the enum `ContentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `entutyType` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `singeltonKey` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `invokeAt` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[singletonKey]` on the table `HomePageContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityType` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVE');
ALTER TABLE "public"."Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Project" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Service" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Testimonial" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "status" TYPE "ContentStatus_new" USING ("status"::text::"ContentStatus_new");
ALTER TABLE "Service" ALTER COLUMN "status" TYPE "ContentStatus_new" USING ("status"::text::"ContentStatus_new");
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "ContentStatus_new" USING ("status"::text::"ContentStatus_new");
ALTER TABLE "Testimonial" ALTER COLUMN "status" TYPE "ContentStatus_new" USING ("status"::text::"ContentStatus_new");
ALTER TYPE "ContentStatus" RENAME TO "ContentStatus_old";
ALTER TYPE "ContentStatus_new" RENAME TO "ContentStatus";
DROP TYPE "public"."ContentStatus_old";
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "Service" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "Testimonial" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropIndex
DROP INDEX "AuditLog_entutyType_entityId_idx";

-- DropIndex
DROP INDEX "HomePageContent_singeltonKey_key";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "entutyType",
ADD COLUMN     "entityType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HomePageContent" DROP COLUMN "singeltonKey",
ADD COLUMN     "singletonKey" TEXT NOT NULL DEFAULT 'homepage';

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "invokeAt",
ADD COLUMN     "revokeAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "HomePageContent_singletonKey_key" ON "HomePageContent"("singletonKey");
