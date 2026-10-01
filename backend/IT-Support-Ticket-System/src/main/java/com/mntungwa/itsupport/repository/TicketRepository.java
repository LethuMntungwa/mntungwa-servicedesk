package com.mntungwa.itsupport.repository;

import com.mntungwa.itsupport.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
