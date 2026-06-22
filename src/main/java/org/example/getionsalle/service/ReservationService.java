package org.example.getionsalle.service;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.dto.ReservationRequest;
import org.example.getionsalle.entity.*;
import org.example.getionsalle.repository.ReservationRepository;
import org.example.getionsalle.repository.SalleRepository;
import org.example.getionsalle.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final SalleRepository salleRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public Reservation create(ReservationRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));

        Salle salle = salleRepository.findById(request.getSalleId())
                .orElseThrow(() -> new RuntimeException("Salle non trouvee"));

        List<Reservation> conflicts = reservationRepository.findConflicts(
                salle.getId(), request.getDate(), request.getHeureDebut(), request.getHeureFin());

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Conflit: la salle est deja reservee pour ce creneau");
        }

        Reservation reservation = Reservation.builder()
                .user(user)
                .salle(salle)
                .date(request.getDate())
                .heureDebut(request.getHeureDebut())
                .heureFin(request.getHeureFin())
                .statut(StatutReservation.EN_ATTENTE)
                .build();

        Reservation saved = reservationRepository.save(reservation);
        emailService.sendConfirmation(saved);
        return saved;
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getBySalle(Long salleId) {
        return reservationRepository.findBySalleId(salleId);
    }

    public List<Reservation> getByStatut(StatutReservation statut) {
        return reservationRepository.findByStatut(statut);
    }

    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation non trouvee"));
    }

    public Reservation valider(Long id) {
        Reservation r = getById(id);
        r.setStatut(StatutReservation.VALIDEE);
        Reservation saved = reservationRepository.save(r);
        emailService.sendValidation(saved);
        return saved;
    }

    public Reservation refuser(Long id) {
        Reservation r = getById(id);
        r.setStatut(StatutReservation.REFUSEE);
        Reservation saved = reservationRepository.save(r);
        emailService.sendRefus(saved);
        return saved;
    }

    public Reservation annuler(Long id) {
        Reservation r = getById(id);
        r.setStatut(StatutReservation.ANNULEE);
        return reservationRepository.save(r);
    }
}
