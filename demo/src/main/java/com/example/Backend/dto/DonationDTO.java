package com.example.Backend.dto;

import java.time.LocalDate;

public class DonationDTO {
    private Long id;
    private Double amount;
    private LocalDate date;
    private CampaignDTO campaign;
    private String donorEmail;

    public DonationDTO() {}

    public DonationDTO(Long id, Double amount, LocalDate date, CampaignDTO campaign, String donorEmail) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.campaign = campaign;
        this.donorEmail = donorEmail;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public CampaignDTO getCampaign() {
        return campaign;
    }

    public void setCampaign(CampaignDTO campaign) {
        this.campaign = campaign;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }
}
