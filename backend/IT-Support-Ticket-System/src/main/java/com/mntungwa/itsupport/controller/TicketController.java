package com.mntungwa.itsupport.controller;

import com.mntungwa.itsupport.dto.TicketRequestDTO;
import com.mntungwa.itsupport.dto.TicketResponseDTO;
import com.mntungwa.itsupport.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * TicketController
 *
 * This class provides the REST API endpoints for managing
 * IT support tickets.
 *
 * The controller receives HTTP requests from the frontend
 * and passes the required work to TicketService.
 *
 * Available operations:
 *
 * GET    /tickets
 * GET    /tickets/{id}
 * POST   /tickets
 * PUT    /tickets/{id}
 * DELETE /tickets/{id}
 */
@RestController

/*
 * @Tag groups all ticket-related endpoints together in Swagger UI.
 */
@Tag(
        name = "Tickets",
        description = "Operations for managing IT support tickets"
)
public class TicketController {


    /*
     * TicketService contains the business logic used by
     * this controller.
     */
    private final TicketService ticketService;


    /**
     * Constructor injection.
     *
     * Spring automatically provides the TicketService object
     * when creating this controller.
     */
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }


    /**
     * Get all tickets.
     *
     * Endpoint:
     * GET /tickets
     *
     * This endpoint retrieves every ticket stored in the database.
     */
    @Operation(
            summary = "Get all tickets",
            description = "Retrieves all IT support tickets stored in the system."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Tickets retrieved successfully"
            )
    })
    @GetMapping("/tickets")
    public List<TicketResponseDTO> getAllTickets() {

        return ticketService.getAllTickets();
    }


    /**
     * Get a single ticket by ID.
     *
     * Endpoint:
     * GET /tickets/{id}
     *
     * Example:
     * GET /tickets/11
     */
    @Operation(
            summary = "Get ticket by ID",
            description = "Retrieves one IT support ticket using its unique ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Ticket found successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ticket was not found"
            )
    })
    @GetMapping("/tickets/{id}")
    public TicketResponseDTO getTicketById(

            /*
             * @Parameter explains the ID parameter inside Swagger UI.
             */
            @Parameter(
                    description = "Unique ID of the ticket",
                    example = "11"
            )
            @PathVariable Long id) {

        return ticketService.getTicketById(id);
    }


    /**
     * Create a new ticket.
     *
     * Endpoint:
     * POST /tickets
     *
     * The request body contains the ticket information.
     *
     * @Valid activates the validation rules defined
     * inside TicketRequestDTO.
     */
    @Operation(
            summary = "Create a ticket",
            description = "Creates a new IT support ticket."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Ticket created successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid ticket information"
            )
    })
    @PostMapping("/tickets")
    public ResponseEntity<TicketResponseDTO> createTicket(

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Information required to create a ticket",
                    required = true,
                    content = @Content(
                            schema = @Schema(
                                    implementation = TicketRequestDTO.class
                            )
                    )
            )
            @RequestBody @Valid TicketRequestDTO ticketRequestDTO) {

        /*
         * Passes the request data to the service layer.
         */
        TicketResponseDTO savedTicket =
                ticketService.saveTicket(ticketRequestDTO);


        /*
         * HTTP 201 CREATED tells the client that a new
         * resource was successfully created.
         */
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedTicket);
    }


    /**
     * Update an existing ticket.
     *
     * Endpoint:
     * PUT /tickets/{id}
     *
     * The ID identifies which ticket should be updated.
     */
    @Operation(
            summary = "Update a ticket",
            description = "Updates an existing IT support ticket."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Ticket updated successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid ticket information"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ticket was not found"
            )
    })
    @PutMapping("/tickets/{id}")
    public TicketResponseDTO updateTicket(

            @Parameter(
                    description = "Unique ID of the ticket to update",
                    example = "11"
            )
            @PathVariable Long id,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Updated ticket information",
                    required = true,
                    content = @Content(
                            schema = @Schema(
                                    implementation = TicketRequestDTO.class
                            )
                    )
            )
            @RequestBody @Valid TicketRequestDTO ticketRequestDTO) {

        return ticketService.updateTicket(
                id,
                ticketRequestDTO
        );
    }


    /**
     * Delete a ticket.
     *
     * Endpoint:
     * DELETE /tickets/{id}
     *
     * The ticket is permanently removed from the database.
     */
    @Operation(
            summary = "Delete a ticket",
            description = "Deletes an existing IT support ticket."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Ticket deleted successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ticket was not found"
            )
    })
    @DeleteMapping("/tickets/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTicket(

            @Parameter(
                    description = "Unique ID of the ticket to delete",
                    example = "11"
            )
            @PathVariable Long id) {

        ticketService.deleteTicket(id);
    }
}