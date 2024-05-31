/*
  Warnings:

  - You are about to drop the column `postId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_postId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "_PostsToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostsToTags_AB_unique" ON "_PostsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsToTags_B_index" ON "_PostsToTags"("B");

-- AddForeignKey
ALTER TABLE "_PostsToTags" ADD CONSTRAINT "_PostsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsToTags" ADD CONSTRAINT "_PostsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
