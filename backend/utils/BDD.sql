CREATE DATABASE IF NOT EXISTS `reservation_salle`;
USE `reservation_salle`;

CREATE USER IF NOT EXISTS 'reservation-admin'@'localhost' IDENTIFIED BY 'reservation-password';

GRANT ALL PRIVILEGES
ON `reservation_salle`.*
TO 'reservation-admin'@'localhost';

FLUSH PRIVILEGES;

-- Table: user
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: reservation
CREATE TABLE IF NOT EXISTS `reservation` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `reunion_title` VARCHAR(255) NOT NULL,
    `organizer` VARCHAR(255) NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
