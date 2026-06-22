package org.example.getionsalle.service;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.entity.StatutReservation;
import org.example.getionsalle.repository.ReservationRepository;
import org.example.getionsalle.repository.SalleRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final ReservationRepository reservationRepository;
    private final SalleRepository salleRepository;

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalReservations", reservationRepository.count());
        stats.put("totalSalles", salleRepository.count());
        stats.put("reservationsValidees", reservationRepository.countByStatut(StatutReservation.VALIDEE));
        stats.put("reservationsEnAttente", reservationRepository.countByStatut(StatutReservation.EN_ATTENTE));

        List<Object[]> bySalle = reservationRepository.countBySalle();
        if (!bySalle.isEmpty()) {
            Long salleId = (Long) bySalle.get(0)[0];
            Long count = (Long) bySalle.get(0)[1];
            salleRepository.findById(salleId).ifPresent(s ->
                    stats.put("sallePlusUtilisee", s.getNom()));
            stats.put("maxReservations", count);
        }

        List<Object[]> byHour = reservationRepository.countByHour();
        if (!byHour.isEmpty()) {
            stats.put("heureDePointe", byHour.get(0)[0] + "h");
        }

        long totalSalles = salleRepository.count();
        if (totalSalles > 0) {
            long validees = reservationRepository.countByStatut(StatutReservation.VALIDEE);
            stats.put("tauxOccupation", (validees * 100) / totalSalles + "%");
        }

        return stats;
    }
}
