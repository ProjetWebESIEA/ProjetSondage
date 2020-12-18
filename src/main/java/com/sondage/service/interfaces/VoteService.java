package com.sondage.service.interfaces;

import com.sondage.model.User;
import com.sondage.model.Vote;

import java.util.List;
import java.util.Optional;

public interface VoteService {
    Vote voter(Vote vote);
    List<Optional<Vote>> getMyVotes(User user);
    void deleteVote(Long voteId);
}
