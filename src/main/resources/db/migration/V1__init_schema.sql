CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'UTILISATEUR'
);

CREATE TABLE salles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    type VARCHAR(30) NOT NULL,
    capacite INT NOT NULL,
    equipements VARCHAR(500),
    disponible BOOLEAN DEFAULT TRUE
);

INSERT INTO users (nom, email, password, role)
VALUES ('Admin', 'admin@gestion-salles.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'ADMIN');
