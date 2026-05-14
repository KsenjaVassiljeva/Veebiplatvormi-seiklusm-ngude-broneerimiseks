# Questoria - Quest Room Booking Platform

This is a full-stack web application for booking quest rooms. The project includes a frontend built with HTML, CSS, and JavaScript, and a backend built with Node.js, Express, MySQL, and Sequelize.

## Technology Stack

- **Backend Framework:** Express.js - A minimal and flexible Node.js web application framework used to build RESTful APIs and handle HTTP requests/responses for the quest booking platform
- **Database:** MySQL with Sequelize ORM for data management
- **Frontend:** HTML5, CSS3, and Vanilla JavaScript
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Project Structure

```
├── config/
│   └── database.js           # Sequelize database configuration
├── models/
│   ├── User.js              # User model
│   ├── Quest.js             # Quest model
│   ├── TimeSlot.js          # TimeSlot model
│   ├── Booking.js           # Booking model
│   └── index.js             # Models integration
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── quests.js            # Quests routes
│   ├── timeSlots.js         # TimeSlots routes
│   └── bookings.js          # Bookings routes
├── js/
│   ├── api-client.js        # Frontend API client
│   ├── script.js            # Frontend scripts
│   └── lang.js              # Language support
├── css/                      # Stylesheets
├── images/                   # Image assets
├── server.js                 # Express server entry point
├── init-db.js               # Database initialization script
└── package.json             # Dependencies
```

## Installation & Setup

### Prerequisites
- Node.js and npm installed
- MySQL server running on port 3306

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database connection:**
   Edit `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=questoria
   DB_USER=root
   DB_PASSWORD=
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

3. **Initialize database:**
   ```bash
   node create-db.js
   node init-db.js
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

## Database Schema

### Users Table
- id (INT, Primary Key)
- first_name (VARCHAR)
- last_name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, hashed)
- created_at, updated_at

### Quests Table
- id (INT, Primary Key)
- title (VARCHAR)
- description (TEXT)
- price_per_person (DECIMAL)
- min_players, max_players (INT)
- duration (VARCHAR)
- difficulty (ENUM)
- genre (VARCHAR)
- rating (DECIMAL)
- image (VARCHAR)
- created_at, updated_at

### TimeSlots Table
- id (INT, Primary Key)
- quest_id (INT, Foreign Key)
- date (DATE)
- time (TIME)
- available_slots (INT)
- is_available (BOOLEAN)
- created_at, updated_at

### Bookings Table
- id (INT, Primary Key)
- user_id (INT, Foreign Key)
- time_slot_id (INT, Foreign Key)
- number_of_people (INT)
- total_price (DECIMAL)
- status (ENUM: pending, confirmed, cancelled)
- booking_date (DATETIME)
- created_at, updated_at

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Quests
- `GET /api/quests` - Get all quests
- `GET /api/quests/:id` - Get quest by ID
- `POST /api/quests` - Create new quest

### TimeSlots
- `GET /api/time-slots/quest/:questId` - Get all slots for quest
- `GET /api/time-slots/quest/:questId/available` - Get available slots with date range
- `POST /api/time-slots` - Create new time slot

### Bookings
- `POST /api/bookings` - Create booking (requires authentication)
- `GET /api/bookings` - Get user's bookings (requires authentication)
- `GET /api/bookings/:id` - Get specific booking (requires authentication)
- `DELETE /api/bookings/:id` - Cancel booking (requires authentication)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Upon login/registration, a token is received and must be sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are stored in browser's localStorage and automatically sent with API requests.

## Frontend Pages

- `index.html` - Home page with recommended quests
- `catalog.html` - Full catalog of quests (dynamically loaded)
- `quest.html` - Quest details page
- `booking.html` - Booking page with time slot selection
- `login.html` - User login
- `register.html` - User registration
- `contacts.html` - Contact information
- `about.html` - About us page

## Security Features

- Passwords are hashed with bcryptjs
- JWT tokens for session management
- Protected API endpoints require authentication
- CORS enabled for frontend communication

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT, bcryptjs
- **Other:** CORS, dotenv

## Development

To run the server in development mode with auto-restart:
```bash
npm install -g nodemon
npm run dev
```

## License

This project is part of a diploma thesis.
