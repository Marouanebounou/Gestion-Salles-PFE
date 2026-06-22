package org.example.getionsalle.controller;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.dto.ReservationRequest;
import org.example.getionsalle.entity.Reservation;
import org.example.getionsalle.entity.StatutReservation;
import org.example.getionsalle.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> create(@RequestBody ReservationRequest request,
                                               Authentication auth) {
        return ResponseEntity.ok(reservationService.create(request, auth.getName()));
    }

    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getByUser(@PathVariable Long userId) {
        return reservationService.getByUser(userId);
    }

    @GetMapping("/salle/{salleId}")
    public List<Reservation> getBySalle(@PathVariable Long salleId) {
        return reservationService.getBySalle(salleId);
    }

    @GetMapping("/statut/{statut}")
    public List<Reservation> getByStatut(@PathVariable StatutReservation statut) {
        return reservationService.getByStatut(statut);
    }

    @PutMapping("/{id}/valider")
    public ResponseEntity<Reservation> valider(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.valider(id));
    }

    @PutMapping("/{id}/refuser")
    public ResponseEntity<Reservation> refuser(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.refuser(id));
    }

    @PutMapping("/{id}/annuler")
    public ResponseEntity<Reservation> annuler(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.annuler(id));
    }
}
