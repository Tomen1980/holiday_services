/*
  Warnings:

  - You are about to drop the column `date` on the `Holiday` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Holiday` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Holiday_date_key` ON `Holiday`;

-- AlterTable
ALTER TABLE `Holiday` DROP COLUMN `date`,
    DROP COLUMN `year`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;
