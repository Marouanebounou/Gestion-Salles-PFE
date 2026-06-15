package org.example.getionsalle.repository;

import org.example.getionsalle.entity.Salle;
import org.example.getionsalle.entity.TypeSalle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SalleRepository extends JpaRepository<Salle, Long> {
    List<Salle> findByDisponibleTrue();
    List<Salle> findByType(TypeSalle type);
    List<Salle> findByCapaciteGreaterThanEqual(int capacite);
}
