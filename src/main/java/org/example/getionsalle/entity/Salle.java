package org.example.getionsalle.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "salles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Salle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Enumerated(EnumType.STRING)
    private TypeSalle type;

    private int capacite;

    private String equipements;

    private boolean disponible;
}
