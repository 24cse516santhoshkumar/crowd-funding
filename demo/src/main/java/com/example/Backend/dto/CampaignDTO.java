package com.example.Backend.dto;

import java.time.LocalDate;

public class CampaignDTO {
    private Long id;
    private String title;
    private String description;
    private Double goalAmount;
    private Double raisedAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String categoryName;

    public CampaignDTO() {}

    public CampaignDTO(Long id, String title, String description, Double goalAmount, Double raisedAmount, 
                      LocalDate startDate, LocalDate endDate, String status, String categoryName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.goalAmount = goalAmount;
        this.raisedAmount = raisedAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.categoryName = categoryName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getGoalAmount() {
        return goalAmount;
    }

    public void setGoalAmount(Double goalAmount) {
        this.goalAmount = goalAmount;
    }

    public Double getRaisedAmount() {
        return raisedAmount;
    }

    public void setRaisedAmount(Double raisedAmount) {
        this.raisedAmount = raisedAmount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
