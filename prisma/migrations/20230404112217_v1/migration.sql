-- CreateTable
CREATE TABLE `BusinessTerm` (
    `id` INTEGER NOT NULL,
    `term_name` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MultiTerm` (
    `id` INTEGER NOT NULL,
    `business_term_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MultiTerm_business_term_id_key`(`business_term_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MultiTerm` ADD CONSTRAINT `MultiTerm_business_term_id_fkey` FOREIGN KEY (`business_term_id`) REFERENCES `BusinessTerm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
