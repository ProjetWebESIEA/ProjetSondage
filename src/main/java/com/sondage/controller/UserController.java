package com.sondage.controller;

import com.sondage.DAO.impl.UserDetailsImpl;
import com.sondage.model.ERole;
import com.sondage.model.Role;
import com.sondage.model.User;
import com.sondage.model.repository.RoleRepository;
import com.sondage.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/user/getOwn")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> getOwnUser() {
        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(userRepository.findById(connectedUser.getId()));
    }

    @GetMapping("/api/user/getById")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> getUser(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.findById(user.getId()));
    }

    // Avoir la liste de tout les user UNIQUEMENT par un admin ou un MODERATEUR
    @GetMapping("/api/user/getAll")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Avoir la liste de tout les user UNIQUEMENT par un admin ou un MODERATEUR
    @GetMapping("/api/user/deleteUser")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<?> deleteAccounnt(@RequestBody UserDetailsImpl user) {
        if (userRepository.existsById(user.getId())) {
            userRepository.deleteById(user.getId());
            return ResponseEntity.ok("Utilisateur supprimé avec succes");

        } else {
            return ResponseEntity.badRequest().body("Utilisateur non trouvé");
        }
    }

    @PostMapping("/api/user/updateAccount")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> updateAccount(@RequestBody UserDetailsImpl user) {

        //On verifie si l'utilisateur connecté essaye de changer son propre compte et q'il n'est ni moderateur ni admin
        UserDetailsImpl connectedUser =  (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        //Si c'est l'utilisateur lui meme
        if  (connectedUser.getUsername().equals(user.getUsername()) && connectedUser.getId().equals(user.getId())
                &&  !SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_ADMIN") &&
                !SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_MODERATOR"))
        {
            System.out.println("UTILISATEUR"+user.getId());
            User userUpdt = new User(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    encoder.encode(user.getPassword()),
                    user.getNom(),
                    user.getPrenom(),
                    user.getCivilite(),
                    user.getDateInscription(),
                    user.getDerniereConnexion()
            );

            return ResponseEntity.ok(userRepository.save(userUpdt));

            //Si l'utilisateur est un MODERATEUR ou un ADMINISTRATEUR
        }   else if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_ADMIN") ||
                SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_MODERATOR"))
        {
            System.out.println("MODO"+user.getId());
            User userUpdt = new User(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    encoder.encode(user.getPassword()),
                    user.getNom(),
                    user.getPrenom(),
                    user.getCivilite(),
                    user.getDateInscription(),
                    user.getDerniereConnexion()
            );

            return ResponseEntity.ok(userRepository.save(userUpdt));

            // SINON (par ex un utilisateur essaye de changer un autre utilisateur)
        }   else {
            return ResponseEntity.badRequest().body("Vous ne pouvez pas modifier cet utilisateur");
        }


    }


}