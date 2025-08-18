package com.example.Backend.controller;

import com.example.Backend.entity.User;
import com.example.Backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public User create(@RequestBody User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userService.createUser(user);
    }

    @GetMapping
    public Page<User> getAll(@RequestParam(defaultValue = "0") int page,
                             @RequestParam(defaultValue = "10") int size,
                             @RequestParam(defaultValue = "id") String sortBy) {
        return userService.getAllUsers(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Authenticated self endpoints
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        if (user == null) throw new RuntimeException("User not found");
        return user;
    }

    @PutMapping("/me")
    public User updateCurrentUser(Authentication authentication, @RequestBody User incoming) {
        String email = authentication.getName();
        User existing = userService.getUserByEmail(email);
        if (existing == null) throw new RuntimeException("User not found");
        existing.setName(incoming.getName());
        existing.setEmail(incoming.getEmail());
        return userService.saveUser(existing);
    }
}
