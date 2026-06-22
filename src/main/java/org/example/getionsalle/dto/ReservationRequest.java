package org.example.getionsalle.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservationRequest {
    private Long salleId;
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
}
