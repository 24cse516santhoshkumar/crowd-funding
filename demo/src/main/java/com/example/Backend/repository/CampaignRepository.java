package com.example.Backend.repository;

import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.CampaignStatus;
import com.example.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    Page<Campaign> findByStatus(CampaignStatus status, Pageable pageable);
    Page<Campaign> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Campaign> findByCreator(User creator, Pageable pageable);
}
