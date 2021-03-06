package com.sondage.controller;

import com.sondage.DAO.impl.UserDetailsImpl;
import com.sondage.model.Dates;
import com.sondage.model.Sondage;
import com.sondage.model.User;
import com.sondage.model.repository.DatesRepository;
import com.sondage.model.repository.LieuRepository;
import com.sondage.model.repository.SondageRepository;
import com.sondage.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class SondageController {

    @Autowired
    private SondageRepository sondageRepository;
    @Autowired
    private DatesRepository dateRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/sondage/getAll")
    public ResponseEntity<?> getAll() {
        if (this.sondageRepository.count() <= 0) {
            return ResponseEntity.badRequest().body("Aucun sondage à afficher");
        }
        return ResponseEntity.ok(this.sondageRepository.findAll());
    }

    @GetMapping("/api/sondage/getOwn")
    public ResponseEntity<?> getOwn() {
        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userRepository.findById(connectedUser.getId()).get();
        return ResponseEntity.ok(this.sondageRepository.findBycreateurSondage(user));
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
        List<Dates> dates = new ArrayList<>();
        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userRepository.findById(connectedUser.getId()).get();
        for (Dates date : sondage.getDate()) {
            if (!this.dateRepository.existsByDate(date.getDate())) {
                Dates tmpDate = new Dates();
                tmpDate.setDate(date.getDate());
                dates.add(this.dateRepository.save(tmpDate));
            } else {
                dates.add(this.dateRepository.findByDate(date.getDate()).get());
            }
        }
        sondage.getDate().clear();
        sondage.setDate(dates);
        sondage.setCreateurSondage(user);
        this.sondageRepository.save(sondage);
        return ResponseEntity.ok("Sondage crée avec succes");
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
