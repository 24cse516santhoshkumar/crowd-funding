package com.example.Backend.controller;

import com.example.Backend.entity.Donation;
import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.User;
import com.example.Backend.service.CampaignService;
import com.example.Backend.service.UserService;
import com.example.Backend.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private UserService userService;

    @PostMapping
    public Donation create(@RequestBody Donation donation, org.springframework.security.core.Authentication authentication) {
        // Ensure managed Campaign entity is attached based on incoming id
        if (donation.getCampaign() != null && donation.getCampaign().getId() != null) {
            Campaign campaign = campaignService.getCampaignById(donation.getCampaign().getId())
                    .orElseThrow(() -> new RuntimeException("Campaign not found"));
            donation.setCampaign(campaign);
        }

        // If authenticated, set donor by current user; otherwise accept incoming donor as-is (optional)
        if (authentication != null) {
            String email = authentication.getName();
            User current = userService.getUserByEmail(email);
            if (current != null) {
                donation.setDonor(current);
            }
        }

        // Default date if missing
        if (donation.getDate() == null) {
            donation.setDate(java.time.LocalDate.now());
        }

        return donationService.createDonation(donation);
    }

    @GetMapping
    public Page<Donation> getAll(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "id") String sortBy) {
        return donationService.getAllDonations(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public Donation getById(@PathVariable Long id) {
        return donationService.getDonationById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }
}
