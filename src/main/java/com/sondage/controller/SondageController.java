package com.sondage.controller;

import com.sondage.model.Sondage;
import com.sondage.model.repository.LieuRepository;
import com.sondage.model.repository.SondageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class SondageController {

    @Autowired
    private SondageRepository sondageRepository;

    @Autowired
    private LieuRepository lieuRepository;

    @GetMapping("/api/sondage/getAll")
    public ResponseEntity<?> getAll() {
        if (this.sondageRepository.count() <= 0) {
            return ResponseEntity.badRequest().body("Aucun sondage à afficher");
        }
        return ResponseEntity.ok(this.sondageRepository.findAll());
    }

    @GetMapping("/api/sondage/getLieux")
    public ResponseEntity<?> getLieux() {
        return ResponseEntity.ok(this.lieuRepository.findAll());
    }

    @GetMapping("/api/sondage/getById")
    public ResponseEntity<?> getSondage(@RequestBody Sondage sondage) {
        if (this.sondageRepository.findById(sondage.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body("Aucun sondage trouvé");
        }
        return ResponseEntity.ok(this.sondageRepository.findById(sondage.getId()));
    }

    @PostMapping("/api/sondage/create")
    public ResponseEntity<?> createSondage(@RequestBody Sondage sondage) {
        System.out.println(sondage.getLieu());
        //this.sondageRepository.save(sondage)
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/api/sondage/deleteById/{sondageId}")
    public ResponseEntity<?> deleteSondage(@PathVariable Long sondageId) {
        if (this.sondageRepository.existsById(sondageId)){
            this.sondageRepository.deleteById(sondageId);
            return ResponseEntity.ok("Supprimé avec succés");
        }
        return ResponseEntity.badRequest().body("Aucun sondage à supprimer");
    }

}
