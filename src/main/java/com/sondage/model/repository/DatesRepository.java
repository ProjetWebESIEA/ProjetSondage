package com.sondage.model.repository;

import com.sondage.model.Dates;
import com.sondage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.Optional;

public interface DatesRepository extends JpaRepository<Dates, Long> {
    Boolean existsByDate(Date date);
    Optional<Dates> findByDate(Date date);
}
