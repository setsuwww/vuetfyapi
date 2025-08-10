-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `Destination_categoryId_fkey`;

-- DropIndex
DROP INDEX `Destination_categoryId_fkey` ON `destination`;

-- AlterTable
ALTER TABLE `destination` MODIFY `image` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
