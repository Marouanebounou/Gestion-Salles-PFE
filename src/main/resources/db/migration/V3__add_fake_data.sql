-- Insert fake users with different roles
-- Password for all users: 'password' (bcrypt hash: $2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi)
INSERT INTO users (nom, email, password, role) VALUES
('Jean Dupont', 'jean.dupont@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'UTILISATEUR'),
('Marie Martin', 'marie.martin@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'UTILISATEUR'),
('Pierre Bernard', 'pierre.bernard@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'RESPONSABLE'),
('Sophie Dubois', 'sophie.dubois@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'RESPONSABLE'),
('Lucas Petit', 'lucas.petit@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'UTILISATEUR'),
('Emma Garcia', 'emma.garcia@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'UTILISATEUR'),
('Thomas Robert', 'thomas.robert@example.com', '$2a$10$dXJ3SW6G7P50lGmMQOqKMeRNlEPrYoNStWlv8Q9V5u7FrKdb0KOSi', 'UTILISATEUR');

-- Insert fake salles (rooms)
INSERT INTO salles (nom, type, capacite, equipements, disponible) VALUES
('Salle A101', 'CLASSE', 30, 'Tableau blanc, Projecteur, WiFi', TRUE),
('Amphi Einstein', 'AMPHITHEATRE', 200, 'Projecteur, Sonorisation, Microphones, WiFi', TRUE),
('Labo Informatique 1', 'LABO', 25, '25 ordinateurs, Tableau blanc, Projecteur, WiFi', TRUE),
('Salle de Réunion B201', 'REUNION', 12, 'Tableau blanc, Écran TV, Visioconférence, WiFi', TRUE),
('Espace Coworking A', 'COWORKING', 40, 'Tables partagées, WiFi, Prises électriques, Machine à café', TRUE),
('Salle B305', 'CLASSE', 35, 'Tableau blanc, Projecteur, WiFi, Climatisation', TRUE),
('Amphi Marie Curie', 'AMPHITHEATRE', 150, 'Projecteur, Sonorisation, Microphones, WiFi', TRUE),
('Labo Chimie 2', 'LABO', 20, 'Équipement de laboratoire, Hotte, Extincteurs', TRUE),
('Salle de Réunion C102', 'REUNION', 8, 'Table de conférence, Écran TV, WiFi', TRUE),
('Espace Coworking B', 'COWORKING', 30, 'Tables partagées, WiFi, Prises électriques', TRUE),
('Salle C210', 'CLASSE', 40, 'Tableau numérique, Projecteur, WiFi', FALSE),
('Labo Physique 1', 'LABO', 18, 'Équipement de laboratoire, Oscilloscopes, WiFi', TRUE);

-- Insert fake reservations (using user IDs 2-8 and salle IDs 1-12)
-- Past reservations
INSERT INTO reservations (user_id, salle_id, date, heure_debut, heure_fin, statut) VALUES
(2, 1, '2026-06-20', '09:00:00', '11:00:00', 'VALIDEE'),
(3, 2, '2026-06-21', '14:00:00', '16:00:00', 'VALIDEE'),
(4, 3, '2026-06-22', '10:00:00', '12:00:00', 'VALIDEE'),
(5, 4, '2026-06-23', '15:00:00', '17:00:00', 'ANNULEE'),
(6, 5, '2026-06-24', '08:00:00', '10:00:00', 'REFUSEE'),

-- Current and future reservations - EN_ATTENTE (pending)
(2, 6, '2026-06-27', '09:00:00', '12:00:00', 'EN_ATTENTE'),
(7, 7, '2026-06-27', '14:00:00', '16:00:00', 'EN_ATTENTE'),
(8, 8, '2026-06-28', '10:00:00', '12:00:00', 'EN_ATTENTE'),

-- Current and future reservations - VALIDEE (validated)
(3, 1, '2026-06-28', '13:00:00', '15:00:00', 'VALIDEE'),
(4, 2, '2026-06-29', '09:00:00', '11:00:00', 'VALIDEE'),
(5, 3, '2026-06-30', '14:00:00', '17:00:00', 'VALIDEE'),
(6, 4, '2026-07-01', '10:00:00', '12:00:00', 'VALIDEE'),
(7, 5, '2026-07-02', '15:00:00', '18:00:00', 'VALIDEE'),
(8, 6, '2026-07-03', '09:00:00', '11:00:00', 'VALIDEE'),
(2, 7, '2026-07-04', '13:00:00', '16:00:00', 'VALIDEE'),
(3, 9, '2026-07-05', '10:00:00', '13:00:00', 'VALIDEE'),

-- Mix of different statuses for future dates
(4, 10, '2026-07-07', '09:00:00', '11:00:00', 'EN_ATTENTE'),
(5, 12, '2026-07-08', '14:00:00', '16:00:00', 'EN_ATTENTE'),
(6, 1, '2026-07-09', '11:00:00', '13:00:00', 'REFUSEE'),
(7, 3, '2026-07-10', '08:00:00', '10:00:00', 'VALIDEE'),
(8, 4, '2026-07-11', '15:00:00', '17:00:00', 'ANNULEE');

