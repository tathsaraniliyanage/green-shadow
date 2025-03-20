# Green Shadow - Crop Monitoring System 🌱  

This project is a **Crop Management System** designed to help manage and track crop data. It is a full-stack application with both frontend and backend components. The backend is built using **Spring Boot** and **MySQL**, while the frontend is developed using **HTML**, **TailwindCSS**, **JavaScript**, **Axios**, and **jQuery**.

## Features 🌟

- Add, update, and delete crop records.
- View crop information in a user-friendly interface.
- Seamless communication between the frontend and backend using RESTful APIs.
- Database-driven crop management using **MySQL**.
- Secure and efficient data management with **Hibernate** for JPA.

## Technologies Used 💡🌾

### Frontend 📎

- **HTML**: Structure of the web pages.
- **TailwindCSS**: For styling the frontend with a utility-first approach.
- **JavaScript**: For adding interactivity to the frontend.
- **Axios**: For making HTTP requests to the backend.
- **jQuery**: For DOM manipulation and event handling.

### Backend 📎

- **Spring Boot**: For building the backend services.
- **MySQL**: For database management.
- **Hibernate**: For Object-Relational Mapping (ORM) and managing JPA (Java Persistence API) data sources.


## Project Setup 🔗

### Prerequisites 📍

Before getting started, ensure that you have the following installed:

- **JDK 11 or higher**
- **MySQL** database server
- **Maven** (for building the backend)
  
### Backend Setup 📍

1. Clone the repository:

   ```bash
   git clone https://github.com/tathsaraniliyanage/green-shadow.git

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```
3. Set up your MySQL database:

    Create a new database in MySQL (e.g., crop_management).

    Update the application.properties or application.yml file with your MySQL credentials:


   ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/crop_management
    spring.datasource.username=your-username
    spring.datasource.password=your-password

4. Run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```
    The backend should now be running on http://localhost:8080


### Frontend Setup 📍
Navigate to the frontend directory:

    cd frontend

Run project using vscode live server Ueing 

The frontend should now be running on http://localhost:5000.
