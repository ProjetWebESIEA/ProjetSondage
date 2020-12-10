package com.sondage.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "lieu" )
public class Lieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String libelleLieu;

    @NotBlank
    private int numeroVoie;

    @NotBlank
    @Size(max = 50)
    private String ville;

    @NotBlank
    private Long codePostale;

    @NotBlank
    @Size(max = 20)
    private String adresse;

    @NotBlank
    @Size(max = 20)
    private String pays;

    public Lieu(Long id, int numeroVoie, String ville, Long codePostale, String adresse, String pays, String libelleLieu) {
        this.id = id;
        this.numeroVoie = numeroVoie;
        this.ville = ville;
        this.codePostale = codePostale;
        this.adresse = adresse;
        this.pays = pays;
        this.libelleLieu = libelleLieu;
    }

    public Lieu(){}

    public Long getId() { return id; }
    public int getNumeroVoie() { return numeroVoie; }
    public Long getCodePostale() { return codePostale; }
    public String getVille() { return ville; }
    public String getAdresse() { return adresse; }
    public String getPays() { return pays; }

    public void setId(Long id) { this.id = id; }
    public void setNumeroVoie(int numeroVoie) { this.numeroVoie = numeroVoie; }
    public void setCodePostale(Long codePostale) { this.codePostale = codePostale; }
    public void setVille(String ville) { this.ville = ville; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public void setPays(String pays) { this.pays = pays; }

    public String getLibelleLieu() {
        return libelleLieu;
    }

    public void setLibelleLieu(String libelleLieu) {
        this.libelleLieu = libelleLieu;
    }
}
