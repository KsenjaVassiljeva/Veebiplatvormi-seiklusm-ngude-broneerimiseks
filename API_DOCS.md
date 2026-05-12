# Questoria API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Health Check
```
GET /health
```

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "token": "eyJ...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "token": "eyJ...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Quests

#### Get All Quests
```
GET /quests

Response (200):
[
  {
    "id": 1,
    "title": "The Secret of the Kidnapper",
    "description": "...",
    "price_per_person": 3.00,
    "min_players": 1,
    "max_players": 4,
    "duration": "1h 30min",
    "difficulty": "Ultra hard",
    "genre": "Horror",
    "rating": 5.0,
    "image": "images/img1.png",
    "createdAt": "2026-05-12T...",
    "updatedAt": "2026-05-12T..."
  },
  ...
]
```

#### Get Single Quest
```
GET /quests/:id

Response (200):
{
  "id": 1,
  "title": "The Secret of the Kidnapper",
  ...
}
```

### TimeSlots

#### Get All Slots for Quest
```
GET /time-slots/quest/1

Response (200):
[
  {
    "id": 1,
    "questId": 1,
    "date": "2026-05-15",
    "time": "15:30:00",
    "available_slots": 4,
    "is_available": true,
    "createdAt": "2026-05-12T...",
    "updatedAt": "2026-05-12T..."
  },
  ...
]
```

#### Get Available Slots with Date Range
```
GET /time-slots/quest/1/available?startDate=2026-05-15&endDate=2026-05-20

Response (200):
[
  {
    "id": 1,
    "questId": 1,
    "date": "2026-05-15",
    "time": "15:30:00",
    "available_slots": 4,
    "is_available": true
  },
  ...
]
```

### Bookings

#### Create Booking
```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "timeSlotId": 1,
  "numberOfPeople": 2
}

Response (201):
{
  "success": true,
  "booking": {
    "id": 1,
    "userId": 1,
    "timeSlotId": 1,
    "numberOfPeople": 2,
    "totalPrice": 6.00,
    "status": "confirmed",
    "bookingDate": "2026-05-12T...",
    "createdAt": "2026-05-12T...",
    "updatedAt": "2026-05-12T..."
  }
}
```

#### Get User's Bookings
```
GET /bookings
Authorization: Bearer <token>

Response (200):
[
  {
    "id": 1,
    "userId": 1,
    "timeSlotId": 1,
    "numberOfPeople": 2,
    "totalPrice": 6.00,
    "status": "confirmed",
    "TimeSlot": {
      "id": 1,
      "questId": 1,
      "date": "2026-05-15",
      "time": "15:30:00",
      "Quest": {
        "id": 1,
        "title": "The Secret of the Kidnapper",
        "price_per_person": 3.00
      }
    }
  },
  ...
]
```

#### Get Specific Booking
```
GET /bookings/1
Authorization: Bearer <token>

Response (200):
{
  "id": 1,
  "userId": 1,
  "timeSlotId": 1,
  "numberOfPeople": 2,
  "totalPrice": 6.00,
  "status": "confirmed",
  ...
}
```

#### Cancel Booking
```
DELETE /bookings/1
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Booking cancelled"
}
```

## Example Frontend Usage with JavaScript

```javascript
// Initialize API client
const apiClient = new ApiClient();

// Register
const registerResponse = await apiClient.register('John', 'Doe', 'john@example.com', 'password123');
console.log(registerResponse.token);

// Login
const loginResponse = await apiClient.login('john@example.com', 'password123');
apiClient.setToken(loginResponse.token);

// Get all quests
const quests = await apiClient.getQuests();
console.log(quests);

// Get slots for a quest
const slots = await apiClient.getQuestSlots(1);
console.log(slots);

// Create booking
const bookingResponse = await apiClient.createBooking(1, 2);
console.log(bookingResponse.booking.id);

// Get user's bookings
const bookings = await apiClient.getMyBookings();
console.log(bookings);

// Cancel booking
await apiClient.cancelBooking(1);
```

## Error Handling

All API endpoints return error messages in case of failure:

```json
{
  "error": "Error description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (user doesn't own the resource)
- 404: Not Found
- 500: Server Error
