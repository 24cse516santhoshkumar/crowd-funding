package com.example.Backend.entity;

import jakarta.persistence.*;

@Entity
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String type; // image/video

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    // Constructors
    public Media() {}

    public Media(String url, String type, Campaign campaign) {
        this.url = url;
        this.type = type;
        this.campaign = campaign;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }
}
