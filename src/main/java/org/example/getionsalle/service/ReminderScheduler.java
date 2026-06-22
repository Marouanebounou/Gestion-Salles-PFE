package org.example.getionsalle.service;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.entity.Reservation;
import org.example.getionsalle.entity.StatutReservation;
import org.example.getionsalle.repository.ReservationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReminderScheduler {

    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    @Scheduled(fixedRate = 3600000)
    public void sendReminders() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalTime oneHourLater = now.plusHours(1);

        List<Reservation> reservations = reservationRepository.findByStatut(StatutReservation.VALIDEE);

        for (Reservation r : reservations) {
            if (r.getDate().equals(today)
                    && r.getHeureDebut().isAfter(now)
                    && r.getHeureDebut().isBefore(oneHourLater)) {
                emailService.sendRappel(r);
            }
        }
    }
}
