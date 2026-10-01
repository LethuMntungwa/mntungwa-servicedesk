package com.mntungwa.itsupport.dto;

import com.mntungwa.itsupport.entity.Priority;
import com.mntungwa.itsupport.entity.TicketStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TicketRequestDTO {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Priority priority;

    private TicketStatus status;

    private String requesterName;


    // =========================================================
    // GET TITLE
    // =========================================================

    public String getTitle() {
        return title;
    }


    // =========================================================
    // SET TITLE
    // =========================================================

    public void setTitle(String title) {
        this.title = title;
    }


    // =========================================================
    // GET DESCRIPTION
    // =========================================================

    public String getDescription() {
        return description;
    }


    // =========================================================
    // SET DESCRIPTION
    // =========================================================

    public void setDescription(String description) {
        this.description = description;
    }


    // =========================================================
    // GET PRIORITY
    // =========================================================

    public Priority getPriority() {
        return priority;
    }


    // =========================================================
    // SET PRIORITY
    // =========================================================

    public void setPriority(Priority priority) {
        this.priority = priority;
    }


    // =========================================================
    // GET STATUS
    // =========================================================

    public TicketStatus getStatus() {
        return status;
    }


    // =========================================================
    // SET STATUS
    // =========================================================

    public void setStatus(TicketStatus status) {
        this.status = status;
    }


    // =========================================================
    // GET REQUESTER NAME
    // =========================================================

    public String getRequesterName() {
        return requesterName;
    }


    // =========================================================
    // SET REQUESTER NAME
    // =========================================================

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }
}