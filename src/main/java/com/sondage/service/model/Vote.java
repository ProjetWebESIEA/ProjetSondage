package com.sondage.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(	name = "vote" )
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotBlank
    private User votant;

    @ManyToOne
    @NotBlank
    private Sondage sondage;

    public Vote() {
    }

    public Vote(Long id, User votant, Sondage sondage) {
        this.id = id;
        this.votant = votant;
        this.sondage = sondage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getVotant() {
        return votant;
    }

    public void setVotant(User votant) {
        this.votant = votant;
    }

    public Sondage getSondage() {
        return sondage;
    }

    public void setSondage(Sondage sondage) {
        this.sondage = sondage;
    }
}