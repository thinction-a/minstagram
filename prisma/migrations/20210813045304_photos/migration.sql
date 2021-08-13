/*
  Warnings:

  - Made the column `hastag` on table `Hashtag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `caption` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hashtag" ALTER COLUMN "hastag" SET NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "caption" SET NOT NULL;
