package com.example.Backend.service;

import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.Donation;
import com.example.Backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import com.example.Backend.entity.User;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;
    
    @Autowired
    private CampaignService campaignService;

    @Transactional
    public Donation createDonation(Donation donation) {
        // Save the donation first
        Donation savedDonation = donationRepository.save(donation);
        
        // Update the campaign's raised amount
        Campaign campaign = donation.getCampaign();
        if (campaign != null && donation.getAmount() != null) {
            Double currentRaisedAmount = campaign.getRaisedAmount() != null ? campaign.getRaisedAmount() : 0.0;
            campaign.setRaisedAmount(currentRaisedAmount + donation.getAmount());
            campaignService.updateStatus(campaign);
        }
        
        return savedDonation;
    }

    public Page<Donation> getAllDonations(int page, int size, String sortBy) {
        return donationRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    public Page<Donation> getDonationsByDonor(User donor, int page, int size, String sortBy) {
        System.out.println("DonationService: Finding donations for donor: " + donor.getEmail() + " (ID: " + donor.getId() + ")");
        System.out.println("DonationService: Page: " + page + ", Size: " + size + ", SortBy: " + sortBy);
        
        Page<Donation> donations = donationRepository.findByDonor(donor, PageRequest.of(page, size, Sort.by(sortBy)));
        System.out.println("DonationService: Found " + donations.getTotalElements() + " donations");
        
        // Debug: Print each donation
        donations.getContent().forEach(donation -> {
            System.out.println("DonationService: Donation ID: " + donation.getId() + 
                             ", Amount: " + donation.getAmount() + 
                             ", Campaign: " + (donation.getCampaign() != null ? donation.getCampaign().getTitle() : "null"));
        });
        
        return donations;
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
