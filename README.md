# Express PostgreSQL CRUD API

## Overview
This API is a basic Express.js application that interacts with a PostgreSQL database for user management. The main features include user login and signup functionalities, along with the following API endpoints:
- **POST /api/signup**: Used for user registration.
- **POST /api/login**: Used for user login with email and password authentication.
- The application uses JWT tokens for protected routes and includes role-based access control.

## Installed Dependencies
This project uses several key dependencies to handle database interactions, user authentication, and API functionalities:
- **bcryptjs**: Library to hash passwords securely.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) for the API.
- **dotenv**: A package to load environment variables from a .env file.
- **express**: Web framework to build the server and handle HTTP requests.
- **jsonwebtoken**: Used for generating JWT tokens for user authentication.
- **pg**: PostgreSQL client for querying and interacting with the database.
- **joi**: For validating request data (like input from the user).

## How to Run
Follow the steps below to get the project up and running:

### 1. Clone the Repository:
   - Clone the project to your local machine using:
     ```bash
     git clone https://github.com/di1eep/OYELABS_ASSIGNMENT
     ```

### 2. Install Dependencies:
   - Navigate to the project directory and install the required dependencies by running:
     ```bash
     npm install
     ```

### 3. Edit `.env` File:
   - In the root directory of your project, create a `.env` file and add the following environment variables to configure the PostgreSQL connection:

     ```plaintext
     DB_USER=your_database_user
     DB_HOST=localhost
     DB_DATABASE=your_database_name
     DB_PASSWORD=your_database_password
     DB_PORT=5432
     ```

### 4. Run the Project:
   - To start the project, run the following command:
     ```bash
     npm run dev
     ```
   This will start the development server and automatically reload the server on any code changes using **nodemon**.

## Login and Signup API Overview
## REFER TO THE JSONFILE FOR POSTMAN CURL
