package com.example.Backend.controller;

import com.example.Backend.entity.Donation;
import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.User;
import com.example.Backend.dto.DonationDTO;
import com.example.Backend.dto.CampaignDTO;
import com.example.Backend.service.CampaignService;
import com.example.Backend.service.UserService;
import com.example.Backend.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import java.util.List;

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

    @Autowired
    private com.example.Backend.repository.DonationRepository donationRepository;

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

    @GetMapping("/debug/all")
    public String debugAllDonations() {
        try {
            List<Donation> allDonations = donationRepository.findAllWithCampaignAndDonor();
            StringBuilder sb = new StringBuilder();
            sb.append("Total donations in database: ").append(allDonations.size()).append("\n");
            
            for (Donation donation : allDonations) {
                sb.append("Donation ID: ").append(donation.getId())
                  .append(", Amount: ").append(donation.getAmount())
                  .append(", Date: ").append(donation.getDate())
                  .append(", Campaign: ").append(donation.getCampaign() != null ? donation.getCampaign().getTitle() : "null")
                  .append(", Donor: ").append(donation.getDonor() != null ? donation.getDonor().getEmail() : "null")
                  .append("\n");
            }
            
            return sb.toString();
        } catch (Exception e) {
            return "Error debugging donations: " + e.getMessage() + "\n" + e.getStackTrace();
        }
    }

    @GetMapping("/my-donations")
    public Page<DonationDTO> getMyDonations(org.springframework.security.core.Authentication authentication,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "50") int size,
                                         @RequestParam(defaultValue = "id") String sortBy) {
        if (authentication == null) {
            System.out.println("ERROR: Authentication is null in getMyDonations");
            throw new RuntimeException("User not authenticated");
        }
        
        String email = authentication.getName();
        System.out.println("Fetching donations for user: " + email);
        System.out.println("Authentication details: " + authentication.getDetails());
        System.out.println("Authentication authorities: " + authentication.getAuthorities());
        
        User currentUser = userService.getUserByEmail(email);
        if (currentUser == null) {
            System.out.println("ERROR: User not found for email: " + email);
            throw new RuntimeException("User not found for email: " + email);
        }
        
        System.out.println("Found user: " + currentUser.getName() + " (ID: " + currentUser.getId() + ")");
        
        Page<Donation> donations = donationService.getDonationsByDonor(currentUser, page, size, sortBy);
        System.out.println("Found " + donations.getTotalElements() + " donations for user: " + email);
        
        // Convert to DTOs
        Page<DonationDTO> donationDTOs = donations.map(this::convertToDTO);
        System.out.println("Converted to " + donationDTOs.getTotalElements() + " DTOs");
        
        return donationDTOs;
    }

    private DonationDTO convertToDTO(Donation donation) {
        Campaign campaign = donation.getCampaign();
        CampaignDTO campaignDTO = null;
        if (campaign != null) {
            campaignDTO = new CampaignDTO(
                campaign.getId(),
                campaign.getTitle(),
                campaign.getDescription(),
                campaign.getGoalAmount(),
                campaign.getRaisedAmount(),
                campaign.getStartDate(),
                campaign.getEndDate(),
                campaign.getStatus() != null ? campaign.getStatus().toString() : null,
                campaign.getCategory() != null ? campaign.getCategory().getName() : null
            );
        }
        
        return new DonationDTO(
            donation.getId(),
            donation.getAmount(),
            donation.getDate(),
            campaignDTO,
            donation.getDonor() != null ? donation.getDonor().getEmail() : null
        );
    }
}
