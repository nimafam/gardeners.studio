-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
