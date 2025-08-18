
package com.example.Backend.service;

import com.example.Backend.entity.*;
import com.example.Backend.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private CategoryService categoryService;

    public Campaign createCampaign(Campaign campaign) {
        // New campaigns start in DRAFT until explicitly started
        campaign.setStatus(CampaignStatus.DRAFT);

        Category category = campaign.getCategory();
        if (category != null) {
            if (category.getId() != null) {
                // Fetch managed category entity
                Optional<Category> managedCategory = categoryService.getById(category.getId());
                if (managedCategory.isPresent()) {
                    campaign.setCategory(managedCategory.get());
                } else {
                    // Category ID provided but not found, save new category
                    Category savedCategory = categoryService.create(category);
                    campaign.setCategory(savedCategory);
                }
            } else {
                // No ID, save new category
                Category savedCategory = categoryService.create(category);
                campaign.setCategory(savedCategory);
            }
        }

        return campaignRepository.save(campaign);
    }

    public Page<Campaign> getAllCampaigns(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return campaignRepository.findAll(pageable);
    }

    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    public Campaign updateCampaign(Long id, Campaign updated) {
        return campaignRepository.findById(id).map(c -> {
            c.setTitle(updated.getTitle());
            c.setDescription(updated.getDescription());
            c.setGoalAmount(updated.getGoalAmount());
            c.setStartDate(updated.getStartDate());
            c.setEndDate(updated.getEndDate());
            return campaignRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Campaign not found"));
    }

    @Transactional
    public void deleteCampaign(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaignRepository.delete(campaign);
    }

    public Page<Campaign> getByStatus(CampaignStatus status, int page, int size, String sortBy) {
        return campaignRepository.findByStatus(status, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Page<Campaign> searchCampaigns(String keyword, int page, int size, String sortBy) {
        return campaignRepository.findByTitleContainingIgnoreCase(keyword, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public void updateStatus(Campaign campaign) {
        if (campaign.getRaisedAmount() >= campaign.getGoalAmount()) {
            campaign.setStatus(CampaignStatus.COMPLETED);
        } else if (campaign.getEndDate() != null && campaign.getEndDate().isBefore(LocalDate.now())) {
            campaign.setStatus(CampaignStatus.EXPIRED);
        } else {
            campaign.setStatus(CampaignStatus.ACTIVE);
        }
        campaignRepository.save(campaign);
    }

    public Campaign startCampaign(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        if (campaign.getStatus() == CampaignStatus.ACTIVE) {
            return campaign;
        }
        campaign.setStatus(CampaignStatus.ACTIVE);
        campaign.setStartDate(LocalDate.now());
        return campaignRepository.save(campaign);
    }
}
