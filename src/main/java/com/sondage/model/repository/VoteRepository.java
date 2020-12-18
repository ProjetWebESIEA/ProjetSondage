package com.sondage.model.repository;
import com.sondage.model.User;
import com.sondage.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Optional<Vote>> findByVotant(User votant);
}
