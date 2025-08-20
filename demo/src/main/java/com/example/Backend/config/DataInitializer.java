package com.example.Backend.config;

import com.example.Backend.entity.User;
import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.Category;
import com.example.Backend.entity.Donation;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.repository.CampaignRepository;
import com.example.Backend.repository.CategoryRepository;
import com.example.Backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Configurable admin credentials (override via application.properties or ENV)
    @Value("${admin.name:Admin}")
    private String adminName;

    @Value("${admin.email:admin@crowdfund.local}")
    private String adminEmail;

    @Value("${admin.password:Admin@123}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Upsert admin user from configuration
            String normalizedEmail = adminEmail == null ? null : adminEmail.trim().toLowerCase();
            User adminUser = normalizedEmail == null ? null : userRepository.findByEmail(normalizedEmail);
            if (adminUser == null) {
                adminUser = new User();
            }
            adminUser.setName(adminName != null ? adminName.trim() : "Admin");
            adminUser.setEmail(normalizedEmail);
            adminUser.setPassword(passwordEncoder.encode(adminPassword));
            adminUser.setIsAdmin(true);
            userRepository.save(adminUser);
            System.out.println("Admin user ensured: " + adminUser.getEmail());
            
            // Create regular user for testing
            User regularUser = new User();
            regularUser.setName("testuser");
            regularUser.setEmail("testuser@gmail.com");
            regularUser.setPassword(passwordEncoder.encode("password"));
            regularUser.setIsAdmin(false);
            userRepository.save(regularUser);
            
            System.out.println("Regular user created: " + regularUser.getEmail());
            
            // Create test category
            Category testCategory = new Category();
            testCategory.setName("Technology");
            categoryRepository.save(testCategory);
            
            System.out.println("Test category created: " + testCategory.getName());
        };
    }
}