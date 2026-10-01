# Mntungwa ServiceDesk

## IT Support Ticket Management System

Mntungwa ServiceDesk is a full-stack IT Support Ticket Management System designed to help IT support teams create, manage, track and resolve support tickets.

The project demonstrates practical experience in Java backend development, REST APIs, database integration, automated testing and React frontend development.

---

## Project Overview

Mntungwa ServiceDesk allows users to:

- Create IT support tickets
- View all support tickets
- View individual tickets
- Update existing tickets
- Delete tickets
- Change ticket status
- Search tickets
- Filter tickets by status
- Filter tickets by priority
- Track ticket statistics
- View ticket details
- Test REST APIs through Swagger/OpenAPI

The system follows a full-stack architecture where the React frontend communicates with a Spring Boot REST API, which communicates with a MySQL database.

---

## Project Branding

**MNTUNGWA HOLDINGS**

**Mntungwa ServiceDesk**

**IT Support Ticket Management**

---

## Technologies Used

### Backend

- Java 21
- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA
- Hibernate
- Maven
- MySQL
- Bean Validation
- REST API
- Swagger / OpenAPI

### Frontend

- React
- JavaScript
- Vite
- Axios
- HTML
- CSS

### Testing

- JUnit
- Spring Boot Test
- MockMvc
- Maven Test

### Development Tools

- IntelliJ IDEA
- MySQL
- Git
- GitHub

---

## System Architecture

```text
User
  |
  v
React Frontend
  |
  | HTTP / REST API
  v
Spring Boot Backend
  |
  | Spring Data JPA
  v
MySQL Database