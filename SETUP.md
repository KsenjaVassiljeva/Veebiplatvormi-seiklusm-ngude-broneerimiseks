# Questoria Backend Setup Summary

## What Has Been Created

### 1. **Database Structure** (MySQL)
- **Users table**: For user registration and authentication
- **Quests table**: For quest room information
- **TimeSlots table**: For available booking times
- **Bookings table**: For user bookings

All tables have been created and populated with sample data.

### 2. **Backend API** (Node.js + Express)
Located in `/routes` folder:
- **auth.js**: User registration, login, and authentication
- **quests.js**: Retrieve quest information
- **timeSlots.js**: Manage available time slots
- **bookings.js**: Create and manage bookings

### 3. **Database Models** (Sequelize ORM)
Located in `/models` folder:
- User.js - User authentication with bcrypt password hashing
- Quest.js - Quest information
- TimeSlot.js - Available booking times with foreign key to Quest
- Booking.js - User bookings with foreign keys to User and TimeSlot

### 4. **Frontend Integration**
- **api-client.js**: JavaScript API client for frontend
- **auth.js**: Frontend authentication state management
- Updated HTML pages to use API for dynamic data:
  - index.html: Recommended quests loaded from API
  - catalog.html: All quests loaded from API
  - booking.html: Time slots and booking functionality
  - login.html: User authentication
  - register.html: User registration

## How to Use

### Starting the Server

1. **Ensure MySQL is running** on port 3306

2. **Start the backend server**:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

3. **Access the frontend**:
   Open `http://localhost:5000` in your browser

### User Flow

1. **Register** - Create an account at `/register.html`
2. **Login** - Sign in at `/login.html`
3. **Browse Quests** - View available quests at `/catalog.html`
4. **Book Quest** - Select time slot and book at `/booking.html`
5. **View Bookings** - Check your bookings (saved in browser)

## Database Details

### Connection
- **Host**: localhost
- **Port**: 3306
- **Database**: questoria
- **User**: root
- **Password**: (empty by default)

### Sample Data
The database has been populated with:
- 3 sample quests
- 5 days of time slots (4 times per day per quest)
- Times: 15:30, 17:00, 18:30, 20:00

## API Authentication

- Uses JWT (JSON Web Tokens)
- Token is stored in browser's localStorage
- Token is automatically sent with API requests
- Protected endpoints require valid token

## File Structure

```
project/
├── server.js                 # Main Express app
├── package.json             # Dependencies
├── .env                     # Configuration (secrets)
├── config/
│   └── database.js          # Sequelize config
├── models/
│   ├── User.js
│   ├── Quest.js
│   ├── TimeSlot.js
│   ├── Booking.js
│   └── index.js
├── routes/
│   ├── auth.js
│   ├── quests.js
│   ├── timeSlots.js
│   └── bookings.js
├── js/
│   ├── api-client.js        # Frontend API wrapper
│   ├── auth.js              # Frontend auth state
│   ├── script.js
│   └── lang.js
├── css/                     # Stylesheets
├── images/                  # Images
└── HTML files               # Frontend pages
```

## Troubleshooting

### "Cannot connect to database"
- Ensure MySQL is running
- Check DB_HOST, DB_USER, DB_PASSWORD in .env
- Run `node create-db.js` to create the database

### "Quests not loading"
- Ensure backend is running (`npm start`)
- Check browser console for errors
- Verify API is accessible at `http://localhost:5000/api/quests`

### "Login not working"
- Ensure you have registered first
- Check that credentials are correct
- Clear browser localStorage and try again

### "No time slots showing"
- Ensure database is initialized with `node init-db.js`
- Check that quest ID exists in database

## Next Steps / Enhancements

1. Add payment integration
2. Add email notifications
3. Add admin panel for managing quests and bookings
4. Add review/rating system for completed quests
5. Improve UI with better styling
6. Add mobile app
7. Add multiple language support backend
8. Add calendar widget for date selection
9. Add search and filter functionality
10. Add analytics and reporting

## Important Notes

- Currently running on localhost only
- For production, update CORS settings
- Consider using environment-specific configurations
- Add rate limiting for API security
- Implement database backups
- Add logging system
- Increase JWT token expiration as needed
