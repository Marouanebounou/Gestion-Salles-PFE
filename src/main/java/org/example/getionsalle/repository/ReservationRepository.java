package org.example.getionsalle.repository;

import org.example.getionsalle.entity.Reservation;
import org.example.getionsalle.entity.StatutReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findBySalleId(Long salleId);

    List<Reservation> findByStatut(StatutReservation statut);

    @Query("SELECT r FROM Reservation r WHERE r.salle.id = :salleId AND r.date = :date " +
           "AND r.statut <> 'ANNULEE' AND r.statut <> 'REFUSEE' " +
           "AND r.heureDebut < :heureFin AND r.heureFin > :heureDebut")
    List<Reservation> findConflicts(@Param("salleId") Long salleId,
                                    @Param("date") LocalDate date,
                                    @Param("heureDebut") LocalTime heureDebut,
                                    @Param("heureFin") LocalTime heureFin);

    @Query("SELECT r.salle.id, COUNT(r) FROM Reservation r WHERE r.statut = 'VALIDEE' GROUP BY r.salle.id ORDER BY COUNT(r) DESC")
    List<Object[]> countBySalle();

    @Query("SELECT HOUR(r.heureDebut), COUNT(r) FROM Reservation r WHERE r.statut = 'VALIDEE' GROUP BY HOUR(r.heureDebut) ORDER BY COUNT(r) DESC")
    List<Object[]> countByHour();

    long countByStatut(StatutReservation statut);
}
