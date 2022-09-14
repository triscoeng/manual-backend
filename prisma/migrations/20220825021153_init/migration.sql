-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `senhaUsuario` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
