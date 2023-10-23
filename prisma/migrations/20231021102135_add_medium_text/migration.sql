-- AlterTable
ALTER TABLE `Chart` MODIFY `descriptionEn` MEDIUMTEXT NOT NULL,
    MODIFY `descriptionAr` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Page` MODIFY `nameEn` VARCHAR(191) NOT NULL,
    MODIFY `nameAr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `descriptionEn` MEDIUMTEXT NOT NULL,
    MODIFY `descriptionAr` MEDIUMTEXT NOT NULL;
