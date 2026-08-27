package com.skillswap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "swap_requests")
public class SwapRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long receiverId;

    private String offeredSkill;
    private String requestedSkill;

    private String status;

    public SwapRequest() {
    }

    public SwapRequest(Long senderId, Long receiverId,
                       String offeredSkill, String requestedSkill,
                       String status) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.offeredSkill = offeredSkill;
        this.requestedSkill = requestedSkill;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getOfferedSkill() {
        return offeredSkill;
    }

    public void setOfferedSkill(String offeredSkill) {
        this.offeredSkill = offeredSkill;
    }

    public String getRequestedSkill() {
        return requestedSkill;
    }

    public void setRequestedSkill(String requestedSkill) {
        this.requestedSkill = requestedSkill;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}