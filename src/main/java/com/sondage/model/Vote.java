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
    private User votant;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Sondage sondage;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Dates date;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Lieu lieu;

    public Vote() {
    }

    public Vote(Long id, User votant, Sondage sondage, Dates date, Lieu lieu) {
        this.id = id;
        this.votant = votant;
        this.sondage = sondage;
        this.date = date;
        this.lieu = lieu;
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

    public Dates getDate() { return date; }

    public void setDate(Dates date) { this.date = date; }

    public Lieu getLieu() { return lieu; }

    public void setLieu(Lieu lieu) { this.lieu = lieu; }
}