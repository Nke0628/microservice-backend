-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MultiEvaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `target_user_id` INTEGER NOT NULL,
    `multi_term_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MultiEvaluation` ADD CONSTRAINT `MultiEvaluation_multi_term_id_fkey` FOREIGN KEY (`multi_term_id`) REFERENCES `MultiTerm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
