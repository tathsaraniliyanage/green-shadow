# Green Shadow - Crop Monitoring System 🌱  
<h1 align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=1100&height=70&duration=4000&lines=Green+Shadow+&color=078179" />
</h1>

This project is a **Crop Management System** designed to help manage and track crop data. It is a full-stack application with both frontend and backend components. The backend is built using **Spring Boot** and **MySQL**, while the frontend is developed using **HTML**, **TailwindCSS**, **JavaScript**, **Axios**, and **jQuery**.

## Features 🌟

- Add, update, and delete crop records.
- View crop information in a user-friendly interface.
- Seamless communication between the frontend and backend using RESTful APIs.
- Database-driven crop management using **MySQL**.
- Secure and efficient data management with **Hibernate** for JPA.

## Technologies Used 💡

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


## Project Setup 🌾

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

1. Navigate to the frontend directory:
    ```
    cd frontend
    ```
    
2. Run project using vscode live server Ueing 

      The frontend should now be running on http://localhost:5000.


## Screenshots 🖼️

![Screenshot from 2025-01-09 19-45-20](https://github.com/user-attachments/assets/519f3347-8a5c-4179-a31e-43c6a82f0bd7)
![Screenshot from 2025-01-14 09-14-06](https://github.com/user-attachments/assets/eda523bf-7e95-45d1-993b-94fa5f3b1382)





## 📚 License

This project is licensed under the [MIT License](LICENSE).   
