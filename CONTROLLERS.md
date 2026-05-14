# Controllers Documentation

## Overview
Контролеры содержат бизнес-логику приложения и отделены от маршрутов для лучшей организации кода.

## Структура контролеров

### 1. authController.js
Обрабатывает аутентификацию пользователей.

**Экспортируемые функции:**
- `register(req, res)` - Регистрация нового пользователя
  - Параметры: firstName, lastName, email, password
  - Возвращает: token, user данные
  - Статус: 201 (успех), 400 (ошибка валидации), 500 (ошибка сервера)

- `login(req, res)` - Вход в систему
  - Параметры: email, password
  - Возвращает: token, user данные
  - Статус: 200 (успех), 401 (неправильные креденшалы), 500 (ошибка)

- `getCurrentUser(req, res)` - Получить текущего пользователя
  - Требует: JWT token в заголовке Authorization
  - Возвращает: user данные
  - Статус: 200 (успех), 401 (неправильный токен), 404 (пользователь не найден)

### 2. questController.js
Обрабатывает операции с квестами.

**Экспортируемые функции:**
- `getAllQuests(req, res)` - Получить все квесты
  - Возвращает: массив всех квестов
  - Статус: 200 (успех), 500 (ошибка)

- `getQuestById(req, res)` - Получить квест по ID
  - Параметры маршрута: id
  - Возвращает: данные квеста
  - Статус: 200 (успех), 404 (не найден), 500 (ошибка)

- `createQuest(req, res)` - Создать новый квест
  - Параметры: title, description, pricePerPerson, minPlayers, maxPlayers, duration, difficulty, genre, rating, image
  - Возвращает: данные созданного квеста
  - Статус: 201 (создан), 500 (ошибка)

### 3. bookingController.js
Обрабатывает бронирования квестов.

**Экспортируемые функции:**
- `createBooking(req, res)` - Создать новое бронирование
  - Требует: аутентификация
  - Параметры: timeSlotId, numberOfPeople
  - Возвращает: booking данные
  - Логика: проверка доступных мест, расчет цены, увеличение занятых мест
  - Статус: 201 (создано), 400 (недостаточно мест), 404 (слот не найден), 500 (ошибка)

- `getUserBookings(req, res)` - Получить все бронирования пользователя
  - Требует: аутентификация
  - Возвращает: массив бронирований с деталями TimeSlot и Quest
  - Статус: 200 (успех), 500 (ошибка)

- `getBookingById(req, res)` - Получить детали бронирования
  - Требует: аутентификация
  - Параметры маршрута: id
  - Возвращает: данные бронирования
  - Статус: 200 (успех), 403 (неавторизовано), 404 (не найдено), 500 (ошибка)

- `cancelBooking(req, res)` - Отменить бронирование
  - Требует: аутентификация
  - Параметры маршрута: id
  - Логика: восстановление доступных мест
  - Статус: 200 (успех), 403 (неавторизовано), 404 (не найдено), 500 (ошибка)

### 4. timeSlotController.js
Обрабатывает временные слоты для квестов.

**Экспортируемые функции:**
- `getSlotsByQuest(req, res)` - Получить все слоты для квеста
  - Параметры маршрута: questId
  - Возвращает: массив временных слотов с информацией о квесте
  - Статус: 200 (успех), 500 (ошибка)

- `getAvailableSlots(req, res)` - Получить доступные слоты в диапазоне дат
  - Параметры маршрута: questId
  - Параметры запроса: startDate (опционально), endDate (опционально)
  - Возвращает: массив доступных слотов
  - Статус: 200 (успех), 500 (ошибка)

- `createTimeSlot(req, res)` - Создать новый временный слот
  - Параметры: questId, date, time, availableSlots
  - Возвращает: данные созданного слота
  - Статус: 201 (создан), 500 (ошибка)

## Middleware

### authMiddleware.js
Проверяет JWT токен в заголовке Authorization и добавляет userId в req.

**Использование:**
```javascript
const authenticateToken = require('../middleware/authMiddleware');
router.get('/protected', authenticateToken, controllerFunction);
```

## API Endpoints

### Authentication (routes/auth.js)
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Получить текущего пользователя

### Quests (routes/quests.js)
- `GET /api/quests` - Получить все квесты
- `GET /api/quests/:id` - Получить квест по ID
- `POST /api/quests` - Создать квест

### Bookings (routes/bookings.js)
- `POST /api/bookings` - Создать бронирование (требует аутентификацию)
- `GET /api/bookings` - Получить бронирования пользователя (требует аутентификацию)
- `GET /api/bookings/:id` - Получить бронирование (требует аутентификацию)
- `DELETE /api/bookings/:id` - Отменить бронирование (требует аутентификацию)

### Time Slots (routes/timeSlots.js)
- `GET /api/time-slots/quest/:questId` - Получить все слоты для квеста
- `GET /api/time-slots/quest/:questId/available` - Получить доступные слоты
- `POST /api/time-slots` - Создать временный слот

## Примеры использования

### Регистрация пользователя
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Создание бронирования
```bash
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "timeSlotId": 1,
  "numberOfPeople": 4
}
```

### Получение доступных слотов
```bash
GET /api/time-slots/quest/1/available?startDate=2024-05-01&endDate=2024-05-31
```

## Обработка ошибок

Все контролеры используют стандартизованный формат ответов:

**Успех:**
```json
{
  "success": true,
  "data": {}
}
```

**Ошибка:**
```json
{
  "error": "Error message"
}
```

## Безопасность

- Все функции бронирования требуют аутентификацию через JWT токен
- Проверка авторизации: пользователь может видеть только свои бронирования
- Пароли хешируются перед сохранением в БД (в модели User)
- JWT токены имеют срок действия 7 дней
