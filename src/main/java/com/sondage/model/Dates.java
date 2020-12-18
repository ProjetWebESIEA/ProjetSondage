package com.sondage.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(	name = "dates")
public class Dates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date date;

    public Dates(Long id, Date date) {
        this.id = id;
        this.date = date;
    }

    public Dates() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Dates{" +
                "id=" + id +
                ", date=" + date +
                '}';
    }
}
