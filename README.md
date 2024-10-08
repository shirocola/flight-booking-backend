
# Secure Flight Search and Booking System - Backend
 

## Overview  

This repository contains the backend for a secure flight search and booking system. The backend is built with NestJS and TypeORM, and it provides RESTful APIs to handle flight search requests and bookings. It also includes user authentication and authorization using JWT, along with compliance features for GDPR/PDPA.

## Technical Stack

### Backend: NestJS (TypeScript)
- **Reason:** NestJS is a Node.js framework that works well with TypeScript. It helps organize code in a clear, modular way, which is important for building reliable applications. I chose it because it’s the framework I use at work, so I’m very comfortable with it. This means I can work faster and more effectively, which is important for completing the project on time. Additionally, NestJS aligns with the tools and technologies mentioned in the job description, demonstrating my readiness to work with the company’s preferred stack.

### Database: PostgreSQL
- **Reason:** PostgreSQL is a reliable, open-source database. It handles complex queries and ensures that data is stored correctly, which is essential for a flight booking system. I’m familiar with PostgreSQL, so I can work with it efficiently without needing to learn a new database system. PostgreSQL is also listed in the job description, making it a relevant choice for this project.

### ORM: TypeORM
- **Reason:** TypeORM is a tool that helps manage the database in a TypeScript environment, making it a good match for NestJS. It supports PostgreSQL and makes it easy to handle database migrations and data management. Since I already use TypeORM at work, I can use it effectively and maintain high-quality code. TypeORM’s compatibility with the tools mentioned in the job description ensures that my skills are aligned with the company’s needs.
  

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

git  clone  https://github.com/shirocola/flight-booking-backend.git

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
For development purposes, you can generate self-signed certificates using the following commands:

#### Generate a Private Key:
Generate a 2048-bit RSA private key.
```bash
openssl genpkey -algorithm RSA -out server.key -pkeyopt rsa_keygen_bits:2048
```
#### Create a Certificate Signing Request (CSR):
Use the private key to create a CSR.
```bash
openssl req -new -key server.key -out server.csr
```
#### Generate a Self-Signed Certificate:

Create a self-signed certificate using the CSR and the private key. This certificate will be valid for 365 days.
```bash
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.cert
```
### Run the PostgreSQL Database Using Docker
Start the PostgreSQL database using Docker:
```bash
docker-compose up postgres -d
```

### Run Migrations and Seed Data
```bash
npm  run  typeorm
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
