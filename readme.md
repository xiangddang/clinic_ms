# Clinic Management System

## Project Overview
The Clinic Management System is an advanced solution tailored to streamline the operations of medical clinics. Designed with user-friendliness at its core, this system simplifies the management of patient records, appointment scheduling, and employee information management, among other functionalities.

## Technology Stack
- **Frontend**: Developed using React, offering a responsive and intuitive user interface.
- **Backend**: Python Flask, ensuring a robust and scalable server-side framework.
- **Database**: Utilizes MySQL for efficient and secure data management.

## Environment Setup
To prepare for installation, the following software is required:
- [Python](https://www.python.org/downloads/) (Version 3.8 or above recommended)
- [Node.js and npm](https://nodejs.org/en/download/) for managing frontend dependencies.
- [MySQL](https://dev.mysql.com/downloads/mysql/) as the database platform.

## Installation Steps

### Backend Setup
1. Clone the repository with `git clone https://github.com/xiangddang/clinic_ms`.
2. Enter the project directory (`cd backend`) and install the necessary Python packages:
   - Flask: `pip3 install flask`
   - Flask-CORS: `pip3 install flask-cors`
   - MySQL Connector for Python (pymysql): `pip3 install pymysql`

### Frontend Setup
1. Switch to the frontend directory (`cd frontend`).
2. Install all required Node modules: `yarn install`

## Database Configuration
1. Populate your MySQL server with initial data using the provided SQL dump file located in the database directory.

## Environment Configuration
### Backend
1. Inside the backend directory, create a `.env` file for environment variables.
2. Populate the file with your MySQL credentials:

```
DATABASE_NAME=[your database name]
DATABASE_USER=[your database username]
DATABASE_PASSWORD=[your database password]
```
3. Update this `.env` file as needed, especially when using existing source code.

### Frontend
1. Create a `.env` file in the frontend directory.
2. Define the backend server URL:
```
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_API_BASE_URL=http://127.0.0.1:5000
```

## Running the Project
- Backend: Launch the server with `python app.py` within the backend directory.
- Frontend: Start the interface using `yarn start` in the frontend directory.

## Additional Notes
- The frontend can be accessed at `http://localhost:3000`.
- Users can create new patient accounts through the registration page for a personalized experience.
- Predefined accounts are available for rapid testing:
    **Patient:** Username `johndoe`, Password `password123`
    **Doctor:** Username `drsmith`, Password `password123`
    **Nurse:** Username `nursejones`, Password `password123`
    **Admin:** Username `adminuser`, Password `adminpass`
- Ensure the database settings in the backend `.env` file are accurate.
- Both frontend and backend servers must be operational for full functionality.
- Set the `REACT_APP_API_URL` in the frontend `.env` file to match your backend server's address.
