package com.example.Backend.service;

import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.Donation;
import com.example.Backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
