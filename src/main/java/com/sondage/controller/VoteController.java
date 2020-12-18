package com.sondage.controller;

import com.sondage.DAO.impl.UserDetailsImpl;
import com.sondage.model.*;
import com.sondage.model.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;
    @Autowired
    private SondageRepository sondageRepository;
    @Autowired
    private DatesRepository dateRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/vote/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.voteRepository.findAll());
    }

    @GetMapping("/api/vote/getById")
    public ResponseEntity<?> getVoteById(@RequestBody Vote vote) {
        return ResponseEntity.ok(this.voteRepository.findById(vote.getId()));
    }

    @GetMapping("/api/vote/getMyVotes")
    public ResponseEntity<?> getMyVotes() {
        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User votant = this.userRepository.findById(connectedUser.getId()).get();

        return ResponseEntity.ok(this.voteRepository.findByVotant(votant));
    }

    @PostMapping("/api/vote/vote")
    public ResponseEntity<?> vote(@RequestBody Vote vote) {

        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Sondage sondage = this.sondageRepository.findById(vote.getSondage().getId()).get();
        Lieu lieu = this.lieuRepository.findById(vote.getLieu().getId()).get();
        Dates date = this.dateRepository.findById(vote.getDate().getId()).get();
        User votant = this.userRepository.findById(connectedUser.getId()).get();

        Vote voter = new Vote();
        voter.setSondage(sondage);
        voter.setVotant(votant);
        voter.setLieu(lieu);
        voter.setDate(date);

        return ResponseEntity.ok(this.voteRepository.save(voter));
    }

    @DeleteMapping("/api/vote/deleteById/{sondageId}")
    public ResponseEntity<?> deleteVote(@PathVariable Long voteId) {
        this.voteRepository.deleteById(voteId);
        return ResponseEntity.ok("Supprimé avec succés");
    }
}
