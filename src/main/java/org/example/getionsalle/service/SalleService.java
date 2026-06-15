package org.example.getionsalle.service;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.entity.Salle;
import org.example.getionsalle.entity.TypeSalle;
import org.example.getionsalle.repository.SalleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalleService {

    private final SalleRepository salleRepository;

    public List<Salle> getAll() {
        return salleRepository.findAll();
    }

    public List<Salle> getDisponibles() {
        return salleRepository.findByDisponibleTrue();
    }

    public List<Salle> getByType(TypeSalle type) {
        return salleRepository.findByType(type);
    }

    public List<Salle> getByCapaciteMin(int capacite) {
        return salleRepository.findByCapaciteGreaterThanEqual(capacite);
    }

    public Salle getById(Long id) {
        return salleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salle non trouvee"));
    }

    public Salle create(Salle salle) {
        return salleRepository.save(salle);
    }

    public Salle update(Long id, Salle updated) {
        Salle salle = getById(id);
        salle.setNom(updated.getNom());
        salle.setType(updated.getType());
        salle.setCapacite(updated.getCapacite());
        salle.setEquipements(updated.getEquipements());
        salle.setDisponible(updated.isDisponible());
        return salleRepository.save(salle);
    }

    public void delete(Long id) {
        salleRepository.deleteById(id);
    }
}
