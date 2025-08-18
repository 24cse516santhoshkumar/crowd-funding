package com.example.Backend.config;

import com.example.Backend.entity.User;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Create admin user
            User adminUser = new User();
            adminUser.setName("maddox");
            adminUser.setEmail("maddox@gmail.com");
            adminUser.setPassword(passwordEncoder.encode("sandy"));
            adminUser.setIsAdmin(true);
            userRepository.save(adminUser);
            
            System.out.println("Admin user created: " + adminUser.getEmail());
        };
    }
}