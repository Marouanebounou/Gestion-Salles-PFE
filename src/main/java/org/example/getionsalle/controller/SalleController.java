package org.example.getionsalle.controller;

import lombok.RequiredArgsConstructor;
import org.example.getionsalle.entity.Salle;
import org.example.getionsalle.entity.TypeSalle;
import org.example.getionsalle.service.SalleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salles")
@RequiredArgsConstructor
public class SalleController {

    private final SalleService salleService;

    @GetMapping
    public List<Salle> getAll() {
        return salleService.getAll();
    }

    @GetMapping("/disponibles")
    public List<Salle> getDisponibles() {
        return salleService.getDisponibles();
    }

    @GetMapping("/type/{type}")
    public List<Salle> getByType(@PathVariable TypeSalle type) {
        return salleService.getByType(type);
    }

    @GetMapping("/capacite/{min}")
    public List<Salle> getByCapacite(@PathVariable int min) {
        return salleService.getByCapaciteMin(min);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salle> getById(@PathVariable Long id) {
        return ResponseEntity.ok(salleService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Salle> create(@RequestBody Salle salle) {
        return ResponseEntity.ok(salleService.create(salle));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salle> update(@PathVariable Long id, @RequestBody Salle salle) {
        return ResponseEntity.ok(salleService.update(id, salle));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
