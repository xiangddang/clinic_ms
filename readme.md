# Clinic Management System

## Project Overview
This Clinic Management System is designed to provide a user-friendly interface for managing daily operations of a clinic. The system allows users to manage patient data, appointments, employee information, and more.

## Technology Stack
- **Frontend**: React
- **Backend**: Python Flask
- **Database**: MySQL

## Environment Setup
Ensure your computer has the following software installed:
- [Python](https://www.python.org/downloads/) (version 3.8 or higher)
- [Node.js and npm](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

## Installation Steps

### Backend Setup
1. Clone the repository: `git clone https://github.com/xiangddang/clinic_ms`
2. Navigate to the project directory: `cd backend`
3. Install dependencies: `pip3 install flask`, `pip3 install flask-cors`, `pip3 install mysql-connector-python`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `yarn install`

## Database Configuration
1. Use the dump file in the database directory to create the database in your MySQL server.

## Environment Configuration
### Backend Environment setup
1. In the bakcend directory, create a file named `.env` file.
2. add the following lines:
```
DATABASE_NAME=[your database name]
DATABASE_USER=[your database username]
DATABASE_PASSWORD=[your database password]
```
3. If you have source code including `env`, you can update the `.env` file with your own database credentials.

### Frontend Environment setup
1. In the frontend directory, create a file named `.env` file.
2. add the following lines:
```
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_API_BASE_URL=http://127.0.0.1:5000
```

## Running the Project
- To start the backend server: Run `python app.py` in the project `backend` directory.
- To start the frontend: Run `yarn start` in the `frontend` directory.


## Additional Notes
- Access the frontend application at `http://localhost:3000`.
- For experiencing the application, new patient accounts can be created in the `register` page. This allows users to fully explore the application with their unique details.
- For quick testing and evaluation, the following default user accounts are available:
  - **Patient Account:**
    - Username: `johndoe`
    - Password: `password123`
  - **Doctor Account:**
    - Username: `drsmith`
    - Password: `password123`
  - **Nurse Account:**
    - Username: `nursejones`
    - Password: `password123`
  - **Admin Account:**
    - Username: `adminuser`
    - Password: `adminpass`
- Ensure that your database configuration matches the settings in your backend `.env` file.
- The frontend and backend servers need to be running for full functionality.
- The frontend's `.env` file should have the `REACT_APP_API_URL` set to your backend server's address for proper communication between the two.
