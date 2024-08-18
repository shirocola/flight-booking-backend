
# Secure Flight Search and Booking System - Backend

  

## Overview

  

This repository contains the backend for a secure flight search and booking system. The backend is built with NestJS and TypeORM, and it provides RESTful APIs to handle flight search requests and bookings. It also includes user authentication and authorization using JWT, along with compliance features for GDPR/PDPA.

  

## Features

  

-  **Flight Search**: Search for flights based on origin, destination, and travel dates.

-  **Booking System**: Capture passenger details and payment information to book flights.

-  **User Authentication**: Secure login using JWT, with role-based access control.

-  **Data Encryption**: HTTPS enforced for all communications.

-  **GDPR/PDPA Compliance**: Users can request the deletion of their account and associated data.

-  **Basic Logging**: Audit logging for user actions.

-  **Input Validation**: Secure input handling to prevent SQL injection and XSS attacks.

  

## Technology Stack

  

-  **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

-  **TypeORM**: An ORM that can run in Node.js, providing a connection between the application and the PostgreSQL database.

-  **JWT**: JSON Web Token is used for secure authentication.

-  **PostgreSQL**: A powerful, open-source object-relational database system.

  

## Prerequisites

  

-  **Node.js**: Version 20 or higher

-  **PostgreSQL**: Version 15 or higher

-  **npm**: Version 6 or higher

-  **OpenSSL**: For generating self-signed certificates

  

## Getting Started

  

### Clone the Repository

  

```bash

git  clone  https://github.com/yourusername/flight-booking-backend.git

cd  flight-booking-backend
```
  
Install Dependencies
```bash
npm  install
```

  
### Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```bash

DATABASE_HOST=localhost

DATABASE_PORT=5432

DATABASE_USERNAME=myuser

DATABASE_PASSWORD=mypassword

DATABASE_NAME=mydatabase

JWT_SECRET=your_jwt_secret
```
  
### Generate SSL Certificates

For development purposes, you can generate self-signed certificates:
openssl  genrsa  -out  server.key  2048

```bash
openssl  req  -new  -key  server.key  -out  server.csr

openssl  x509  -req  -days  365  -in  server.csr  -signkey  server.key  -out  server.cert
```

### Run Migrations and Seed Data
```bash
npm  run  typeorm  migration:run

npm  run  seed
```
  
### Start the Server
```bash
npm  run  start:dev
```

The  server  will  run  on  https://localhost:3000.


### Test the API

You can use tools like Postman or `curl` to interact with the API.

### API Endpoints

-   **GET /flights/search**: Search for flights.
-   **POST /bookings**: Book a flight.
-   **POST /auth/login**: Authenticate a user.
-   **DELETE /users/**
    
    : Delete a user and associated data (GDPR/PDPA compliance).

### Security Considerations

-   **HTTPS**: All traffic is encrypted using SSL.
-   **JWT Authentication**: Secures the API endpoints with token-based authentication.
-   **Input Validation**: Prevents common security vulnerabilities such as SQL injection and XSS.
-   **Error Handling**: Sensitive information is not exposed in error messages.

### License

This project is licensed under the MIT License.