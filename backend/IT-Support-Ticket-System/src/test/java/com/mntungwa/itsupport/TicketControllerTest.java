package com.mntungwa.itsupport;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * TicketControllerTest
 *
 * Automated tests for the Mntungwa ServiceDesk Ticket API.
 *
 * These tests use MockMvc to simulate HTTP requests
 * against the Spring Boot application.
 */
@SpringBootTest
@AutoConfigureMockMvc
class TicketControllerTest {

    /**
     * MockMvc allows us to test REST API endpoints
     * without manually opening a browser.
     */
    @Autowired
    private MockMvc mockMvc;


    /**
     * Test 1:
     *
     * Verifies that GET /tickets successfully returns
     * the list of tickets.
     *
     * Expected response:
     * HTTP 200 OK
     */
    @Test
    void shouldGetAllTickets() throws Exception {

        mockMvc.perform(
                        get("/tickets")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }


    /**
     * Test 2:
     *
     * Verifies that requesting a ticket that does not
     * exist returns HTTP 404 NOT FOUND.
     */
    @Test
    void shouldReturn404ForNonExistingTicket() throws Exception {

        mockMvc.perform(
                        get("/tickets/999999")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());
    }
}