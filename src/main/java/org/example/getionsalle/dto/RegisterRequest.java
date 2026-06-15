package org.example.getionsalle.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nom;
    private String email;
    private String password;
}
