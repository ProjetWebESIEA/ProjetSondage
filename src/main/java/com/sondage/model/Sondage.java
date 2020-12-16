package com.sondage.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(	name = "sondage")
public class Sondage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String nom;

    @ManyToMany
    private Collection<Lieu> lieu;

    @ManyToMany
    private Collection<Dates> date;

    @OneToOne
    private User createurSondage;

    @NotBlank
    @Size(max = 255)
    private String description;

    public Sondage(Long id, String nom, List<Lieu> lieu, List<Dates> date, User createurSondage,String description) {
        this.id = id;
        this.nom = nom;
        this.date = new ArrayList<Dates>();
        this.lieu = new ArrayList<Lieu>();
        this.createurSondage = createurSondage;
        this.description = description;
    }

    public Sondage() {

    }

    public Long getId() { return this.id; }
    public String getNom() { return this.nom; }
    public Collection<Lieu> getLieu() { return this.lieu; }
    public Collection<Dates> getDate() { return this.date; }
    public User getCreateurSondage() { return this.createurSondage; }
    public String getDescription() { return this.description; }

    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setLieu(List<Lieu> lieu) { this.lieu = lieu; }
    public void setDate(List<Dates> date) { this.date = date; }
    public void setCreateurSondage(User createurSondage) { this.createurSondage = createurSondage; }
    public void setDescription(String description) { this.description = description; }

}
