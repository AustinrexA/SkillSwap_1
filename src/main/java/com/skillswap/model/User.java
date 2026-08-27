package com.skillswap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String skillsOffered;

    private String skillsWanted;

    @Column(name = "is_admin")
    private boolean isAdmin = false;

    public User() {
    }

    public User(String name, String email, String password,
                String skillsOffered, String skillsWanted) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skillsOffered = skillsOffered;
        this.skillsWanted = skillsWanted;
        this.isAdmin = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSkillsOffered() {
        return skillsOffered;
    }

    public void setSkillsOffered(String skillsOffered) {
        this.skillsOffered = skillsOffered;
    }

    public String getSkillsWanted() {
        return skillsWanted;
    }

    public void setSkillsWanted(String skillsWanted) {
        this.skillsWanted = skillsWanted;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}