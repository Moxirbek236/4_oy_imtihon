-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_created_by_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
