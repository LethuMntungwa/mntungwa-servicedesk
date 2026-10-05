# Mntungwa ServiceDesk

Mntungwa ServiceDesk is a full-stack IT support ticketing application that I built to manage and track IT support requests.

The project was created as a practical way to improve my Java development skills while also building something related to my IT support experience.

## About the Project

The application allows support staff to create and manage IT support tickets.

Each ticket contains information such as:

* Ticket title
* Description
* Requester name
* Priority
* Status
* Date created

The application also includes a dashboard that gives an overview of the tickets.

## Main Features

* Create new support tickets
* View existing tickets
* Edit tickets
* Delete tickets
* Set ticket priority
* Update ticket status
* View ticket statistics on the dashboard
* Store ticket information in a MySQL database
* REST API communication between the frontend and backend
* Basic error handling for tickets that cannot be found

## Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Maven
* REST API
* MySQL

### Frontend

* React
* JavaScript
* Vite
* HTML
* CSS

### Tools

* Git
* GitHub
* GitHub Desktop
* MySQL
* IDE / Code Editor

## Project Structure

The project is divided into two main parts:

* **Backend** – Java Spring Boot application that handles the API, ticket management, and database communication.
* **Frontend** – React application that provides the interface used to manage the tickets.

```text
mntungwa-servicedesk/
├── backend/
│   └── IT-Support-Ticket-System/
└── frontend/
```

The backend and frontend run separately and communicate through REST API requests.

## How the Application Works

The frontend is used to interact with the application.

When a user creates or changes a ticket, the frontend sends a request to the Spring Boot backend. The backend processes the request and communicates with the MySQL database.

```text
React Frontend
      ↓
Spring Boot REST API
      ↓
MySQL Database
```

## Example Ticket

The application can be used to record an IT issue such as:

**Title:** Cannot connect to Wi-Fi

**Description:** User is unable to connect their laptop to the office Wi-Fi network.

**Priority:** HIGH

**Status:** OPEN

This ticket can then be updated as the support issue is investigated and resolved.

## Screenshots

### Create Ticket

This screen allows a user to create a new IT support ticket.

![Create Ticket](createticket.png)

### Edit Ticket

This screen allows an existing ticket to be updated.

![Edit Ticket](editticket.png)

### Tickets

This screen displays the tickets recorded in the system.

![Tickets](tickets.png)

## Running the Project

### 1. Start the Backend

Open a terminal and navigate to the backend:

```bash
cd backend/IT-Support-Ticket-System
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

The tickets endpoint is:

```text
http://localhost:8080/tickets
```

### 2. Start the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend address in a browser to use the application.

## What I Learned

Building this project gave me practical experience with Java and Spring Boot, especially working with REST APIs and connecting an application to a database.

I also worked with React on the frontend and learned how the frontend communicates with the backend.

Some of the main areas I worked on were:

* Java and Spring Boot
* REST APIs
* CRUD operations
* MySQL database integration
* React
* API communication
* Exception handling
* Git and GitHub
* Debugging and fixing application issues

## Future Improvements

Some features I would like to add to the project in the future include:

* User authentication and login
* Different user roles
* Ticket assignment to support technicians
* Search and filtering
* Ticket comments
* Email notifications
* Improved reporting
* Deployment to a live server

## Project Purpose

I built Mntungwa ServiceDesk as a portfolio project to put my IT support and software development knowledge into practice.

It is also an ongoing project that I can continue improving as I learn more about full-stack development.

## Developer

**Lethukuthula Mntungwa**

IT Support Technician | IT Graduate

GitHub: [LethuMntungwa](https://github.com/LethuMntungwa)
