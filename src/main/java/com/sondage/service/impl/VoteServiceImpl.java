package com.sondage.service.impl;

import com.sondage.DAO.impl.UserDetailsImpl;
import com.sondage.model.*;
import com.sondage.model.repository.*;
import com.sondage.service.interfaces.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

public class VoteServiceImpl implements VoteService {
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

    @Override
    public Vote voter(Vote vote) {
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

        return this.voteRepository.save(vote);
    }

    @Override
    public List<Optional<Vote>> getMyVotes(User user) {
        return this.voteRepository.findByVotant(user);
    }

    public void deleteVote(Long voteId) {
        this.voteRepository.deleteById(voteId);
    }
}
