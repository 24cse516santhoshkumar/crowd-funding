package com.example.Backend.controller;

import com.example.Backend.entity.User;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> payload) {
        String name = payload.getOrDefault("name", "");
        String email = payload.get("email");
        String password = payload.get("password");
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        String token = jwtService.generateToken(email);
        return Map.of("token", token, "user", Map.of(
            "id", user.getId(), 
            "name", user.getName(), 
            "email", user.getEmail(),
            "isAdmin", user.getIsAdmin() != null ? user.getIsAdmin() : false
        ));
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        User user = userRepository.findByEmail(email);
        if (user == null || user.getPassword() == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtService.generateToken(email);
        return Map.of("token", token, "user", Map.of(
            "id", user.getId(), 
            "name", user.getName(), 
            "email", user.getEmail(),
            "isAdmin", user.getIsAdmin() != null ? user.getIsAdmin() : false
        ));
    }
}






