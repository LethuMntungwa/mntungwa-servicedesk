package com.mntungwa.itsupport.service;

import com.mntungwa.itsupport.dto.TicketRequestDTO;
import com.mntungwa.itsupport.dto.TicketResponseDTO;
import com.mntungwa.itsupport.entity.Ticket;
import com.mntungwa.itsupport.entity.TicketStatus;
import com.mntungwa.itsupport.exception.TicketNotFoundException;
import com.mntungwa.itsupport.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    // Repository communicates with the database.
    private final TicketRepository ticketRepository;

    // Constructor injection.
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // =========================================================
    // GET ALL TICKETS
    // =========================================================

    public List<TicketResponseDTO> getAllTickets() {

        return ticketRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // =========================================================
    // GET ONE TICKET
    // =========================================================

    public TicketResponseDTO getTicketById(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new TicketNotFoundException(
                                "Ticket not found with ID: " + id
                        )
                );

        return convertToResponseDTO(ticket);
    }

    // =========================================================
    // CREATE TICKET
    // =========================================================

    public TicketResponseDTO saveTicket(
            TicketRequestDTO ticketRequestDTO) {

        Ticket ticket = new Ticket();

        ticket.setTitle(
                ticketRequestDTO.getTitle()
        );

        ticket.setDescription(
                ticketRequestDTO.getDescription()
        );

        ticket.setPriority(
                ticketRequestDTO.getPriority()
        );

        ticket.setRequesterName(
                ticketRequestDTO.getRequesterName()
        );

        // New tickets are OPEN by default.
        if (ticketRequestDTO.getStatus() == null) {

            ticket.setStatus(
                    TicketStatus.OPEN
            );

        } else {

            ticket.setStatus(
                    ticketRequestDTO.getStatus()
            );
        }

        Ticket savedTicket =
                ticketRepository.save(ticket);

        return convertToResponseDTO(savedTicket);
    }

    // =========================================================
    // UPDATE TICKET
    // =========================================================

    public TicketResponseDTO updateTicket(
            Long id,
            TicketRequestDTO ticketRequestDTO) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new TicketNotFoundException(
                                "Ticket not found with ID: " + id
                        )
                );

        ticket.setTitle(
                ticketRequestDTO.getTitle()
        );

        ticket.setDescription(
                ticketRequestDTO.getDescription()
        );

        ticket.setPriority(
                ticketRequestDTO.getPriority()
        );

        ticket.setRequesterName(
                ticketRequestDTO.getRequesterName()
        );

        // Update status if supplied.
        if (ticketRequestDTO.getStatus() != null) {

            ticket.setStatus(
                    ticketRequestDTO.getStatus()
            );
        }

        Ticket updatedTicket =
                ticketRepository.save(ticket);

        return convertToResponseDTO(updatedTicket);
    }

    // =========================================================
    // DELETE TICKET
    // =========================================================

    public void deleteTicket(Long id) {

        if (!ticketRepository.existsById(id)) {

            throw new TicketNotFoundException(
                    "Ticket not found with ID: " + id
            );
        }

        ticketRepository.deleteById(id);
    }

    // =========================================================
    // CONVERT ENTITY TO RESPONSE DTO
    // =========================================================

    private TicketResponseDTO convertToResponseDTO(
            Ticket ticket) {

        TicketResponseDTO response =
                new TicketResponseDTO();

        response.setId(
                ticket.getId()
        );

        response.setTitle(
                ticket.getTitle()
        );

        response.setDescription(
                ticket.getDescription()
        );

        response.setPriority(
                ticket.getPriority()
        );

        response.setStatus(
                ticket.getStatus()
        );

        response.setRequesterName(
                ticket.getRequesterName()
        );

        response.setCreatedAt(
                ticket.getCreatedAt()
        );

        return response;
    }
}