package com.sondage.service.interfaces;

import com.sondage.model.Sondage;

import java.util.ArrayList;

public interface SondageService {

    Sondage getSondage(int id);
    ArrayList<Sondage> getAll();
    Sondage addSondage(Sondage sondage);
    Sondage updateSondage(Sondage sondage);
    void deleteSondage(int id);
}
