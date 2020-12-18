package com.sondage.model.repository;

import com.sondage.model.Sondage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SondageRepository extends JpaRepository<Sondage, Long> {

}
