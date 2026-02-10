CALENDAR BOOKING API

This is a backend REST API service built to manage user schedules and meetings. It allows users to create, update, and delete meetings while strictly enforcing a non-overlapping schedule rule to prevent double bookings.

TECH STACK

Runtime Environment: Node.js

Framework: Express.js

Database: PostgreSQL

ORM: Sequelize

Language: JavaScript

PREREQUISITES

Before running this project, ensure you have the following installed:

Node.js (v18 or higher)

PostgreSQL

Git

INSTALLATION AND SETUP

Follow these steps to set up and run the project locally.

Clone the repository git clone: "https://github.com/ShauryaNarayan/meeting-scheduler-backend.git" cd meeting-scheduler-backend

Install Dependencies Run the following command to install the required Node.js packages: npm install

Configure Environment Variables Create a file named .env in the root directory of the project. Copy and paste the following configuration into it (update the password if your local PostgreSQL password is different):

PORT=3000 DB_HOST=localhost DB_USER=postgres DB_PASSWORD=root DB_NAME=meeting_db

Setup the Database

Open pgAdmin 4 or your SQL command line.

Create a new database named: meeting_db

The application (Sequelize) will automatically create the required tables (Users, Meetings) when you start the server.

Start the Server Run the following command to start the application in development mode: npm run dev

You should see the message: "Server is running on port 3000" and "Database connected successfully."

API ENDPOINTS

User Management

Create a User

Endpoint: POST /users

Body: { "name": "Rahul", "email": "rahul@example.com" }

Get User Details

Endpoint: GET /users/:id

Meeting Management

Book a Meeting

Endpoint: POST /meetings

Description: Creates a meeting if the time slot is available. Returns 400 Bad Request if the slot overlaps with an existing meeting.

Body: { "userId": 1, "title": "Project Sync", "startTime": "2026-02-10T10:00:00.000Z", "endTime": "2026-02-10T10:30:00.000Z" }

List All Meetings

Endpoint: GET /meetings

Optional Query Parameters (Filters):

?userId=1 (Filter by specific user)

?startDate=2026-02-10&endDate=2026-02-12 (Filter by date range)

Get Meeting Details

Endpoint: GET /meetings/:id

Update / Reschedule a Meeting

Endpoint: PUT /meetings/:id

Description: Updates meeting details. Checks for conflicts before updating.

Body: { "startTime": "2026-02-10T11:00:00.000Z", "endTime": "2026-02-10T11:30:00.000Z" }

Cancel a Meeting

Endpoint: DELETE /meetings/:id

BUSINESS LOGIC (CONFLICT PREVENTION)

The application enforces a strict "No Overlap" rule. When creating or updating a meeting, the system checks the database for any existing meetings that satisfy the following condition:

(ExistingStart < NewEnd) AND (ExistingEnd > NewStart)

If this condition is true, the request is rejected with a "Time slot already booked" error message.

PROJECT STRUCTURE

src/app.js: Application configuration and middleware setup. src/server.js: Entry point to start the server. src/config/: Database connection configuration. src/modules/: Contains the feature modules (User and Meeting).

model/: Sequelize model definitions.

service/: Business logic and database queries.

interface/: Controllers handling request and response.

routes/: API route definitions.