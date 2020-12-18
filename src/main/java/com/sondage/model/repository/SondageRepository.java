package com.sondage.model.repository;

import com.sondage.model.Sondage;
import com.sondage.model.User;
import com.sondage.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SondageRepository extends JpaRepository<Sondage, Long> {
    List<Optional<Sondage>> findBycreateurSondage(User user);
}
