-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoDeEntidade` ENUM('FISICA', 'JURIDICA') NOT NULL,
    `numeroDocumento` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `celular` INTEGER NOT NULL,
    `telefone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `confirmacaoEmail` VARCHAR(191) NOT NULL,
    `cep` INTEGER NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `aceiteTermosDeUso` BOOLEAN NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
