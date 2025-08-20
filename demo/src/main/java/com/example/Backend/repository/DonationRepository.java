package com.example.Backend.repository;

import com.example.Backend.entity.Donation;
import com.example.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    Page<Donation> findByDonor(User donor, Pageable pageable);
    
    // Add a method to find all donations for debugging
    @Query("SELECT d FROM Donation d LEFT JOIN FETCH d.campaign LEFT JOIN FETCH d.donor")
    List<Donation> findAllWithCampaignAndDonor();
}
