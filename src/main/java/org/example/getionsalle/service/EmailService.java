package org.example.getionsalle.service;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.entity.Reservation;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendConfirmation(Reservation reservation) {
        String to = reservation.getUser().getEmail();
        String subject = "Reservation en attente - " + reservation.getSalle().getNom();
        String body = "Bonjour " + reservation.getUser().getNom() + ",\n\n"
                + "Votre demande de reservation a ete enregistree:\n"
                + "Salle: " + reservation.getSalle().getNom() + "\n"
                + "Date: " + reservation.getDate() + "\n"
                + "Horaire: " + reservation.getHeureDebut() + " - " + reservation.getHeureFin() + "\n"
                + "Statut: En attente de validation\n\n"
                + "Vous recevrez un email lors de la validation.";
        send(to, subject, body);
    }

    public void sendValidation(Reservation reservation) {
        String to = reservation.getUser().getEmail();
        String subject = "Reservation VALIDEE - " + reservation.getSalle().getNom();
        String body = "Bonjour " + reservation.getUser().getNom() + ",\n\n"
                + "Votre reservation a ete validee:\n"
                + "Salle: " + reservation.getSalle().getNom() + "\n"
                + "Date: " + reservation.getDate() + "\n"
                + "Horaire: " + reservation.getHeureDebut() + " - " + reservation.getHeureFin() + "\n\n"
                + "Bonne utilisation!";
        send(to, subject, body);
    }

    public void sendRefus(Reservation reservation) {
        String to = reservation.getUser().getEmail();
        String subject = "Reservation REFUSEE - " + reservation.getSalle().getNom();
        String body = "Bonjour " + reservation.getUser().getNom() + ",\n\n"
                + "Votre reservation a ete refusee:\n"
                + "Salle: " + reservation.getSalle().getNom() + "\n"
                + "Date: " + reservation.getDate() + "\n"
                + "Horaire: " + reservation.getHeureDebut() + " - " + reservation.getHeureFin() + "\n\n"
                + "Veuillez choisir un autre creneau.";
        send(to, subject, body);
    }

    public void sendRappel(Reservation reservation) {
        String to = reservation.getUser().getEmail();
        String subject = "RAPPEL - Reservation dans 1h: " + reservation.getSalle().getNom();
        String body = "Bonjour " + reservation.getUser().getNom() + ",\n\n"
                + "Rappel: votre reservation commence bientot!\n"
                + "Salle: " + reservation.getSalle().getNom() + "\n"
                + "Date: " + reservation.getDate() + "\n"
                + "Horaire: " + reservation.getHeureDebut() + " - " + reservation.getHeureFin();
        send(to, subject, body);
    }

    private void send(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erreur envoi email: " + e.getMessage());
        }
    }
}
