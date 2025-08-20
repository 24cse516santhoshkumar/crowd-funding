package com.example.Backend.controller;

import com.example.Backend.entity.Campaign;
import com.example.Backend.entity.CampaignStatus;
import com.example.Backend.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.example.Backend.entity.User;
import com.example.Backend.service.UserService;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private UserService userService;

    @PostMapping
    public Campaign create(@RequestBody Campaign campaign) {
        return campaignService.createCampaign(campaign);
    }

    @GetMapping
    public Page<Campaign> getAll(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "id") String sortBy) {
        return campaignService.getAllCampaigns(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public Campaign getById(@PathVariable Long id) {
        return campaignService.getCampaignById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
    }

    @PutMapping("/{id}")
    public Campaign update(@PathVariable Long id, @RequestBody Campaign campaign) {
        return campaignService.updateCampaign(id, campaign);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
    }

    @GetMapping("/status/{status}")
    public Page<Campaign> getByStatus(@PathVariable CampaignStatus status,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(defaultValue = "id") String sortBy) {
        return campaignService.getByStatus(status, page, size, sortBy);
    }

    @GetMapping("/search")
    public Page<Campaign> search(@RequestParam String keyword,
                                 @RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "id") String sortBy) {
        return campaignService.searchCampaigns(keyword, page, size, sortBy);
    }

    @PutMapping("/{id}/start")
    public Campaign start(@PathVariable Long id) {
        return campaignService.startCampaign(id);
    }

    @GetMapping("/my-campaigns")
    public Page<Campaign> getMyCampaigns(org.springframework.security.core.Authentication authentication,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         @RequestParam(defaultValue = "id") String sortBy) {
        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }
        
        String email = authentication.getName();
        User currentUser = userService.getUserByEmail(email);
        if (currentUser == null) {
            throw new RuntimeException("User not found");
        }
        
        return campaignService.getCampaignsByCreator(currentUser, page, size, sortBy);
    }
}
