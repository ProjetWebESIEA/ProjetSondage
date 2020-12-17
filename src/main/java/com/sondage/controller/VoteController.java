package com.sondage.controller;

import com.sondage.model.Vote;
import com.sondage.model.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    @GetMapping("/api/vote/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.voteRepository.findAll());
    }

    @GetMapping("/api/vote/getById")
    public ResponseEntity<?> getVoteById(@RequestBody Vote vote) {
        return ResponseEntity.ok(this.voteRepository.findById(vote.getId()));
    }

    @PostMapping("/api/vote/create")
    public ResponseEntity<?> createVote(@RequestBody Vote vote) {
        return ResponseEntity.ok(this.voteRepository.save(vote));
    }

    @DeleteMapping("/api/vote/deleteById/{sondageId}")
    public ResponseEntity<?> deleteVote(@PathVariable Long voteId) {
        this.voteRepository.deleteById(voteId);
        return ResponseEntity.ok("Supprimé avec succés");
    }
}
