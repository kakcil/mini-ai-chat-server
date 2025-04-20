# Mini Ai Chat Server

A minimal backend prototype simulating the core logic of an AI chat platform using Node.js (Express.js) and MongoDB. Focused on architectural clarity, clean code, and JWT-based authentication.

---

## Features Implemented

- **User Login** with mock credentials and JWT token generation
- **POST /chat**: Accepts user message, simulates AI response, saves full exchange
- **GET /chat-history/:userId/:characterId**: Returns full message history
- **MongoDB Models** for `User`, `Character`, and `Message`
- **Swagger API Docs** for easy testing and exploration
- **Unit Tests** for critical authentication and messaging functionality

---

## Tech Stack

- **Backend**: Node.js (Express)
- **Database**: MongoDB (with Mongoose)
- **Auth**: JWT
- **Docs**: Swagger
- **Testing**: Jest, Supertest

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mini-ai-chat-server.git
cd mini-ai-chat-server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Change the `.env` file in the root directory with your MongoDb connection string:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=mini-ai-chat-server_#Z8f!A29Lq@c7Xr1^TdW
```

### 4. Run the Server
```bash
npm run seed #for adding mock characters#
npm run dev
```

> The server will be available at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints Overview

### POST `/api/auth/login`
**Description**: Simulates user login and returns a JWT token.
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### POST `/api/chat`
**Description**: Sends a user message, simulates an AI response, saves both.
```json
{
  "userId": "...",
  "characterId": "...",
  "message": "Hello!"
}
```
**Response:**
```json
{
  "success": true,
  "conversation": {
    "userMessage": { ... },
    "aiResponse": { ... }
  }
}
```

### GET `/api/chat/history/:userId/:characterId`
Returns the full conversation history between user and character.

---

## Swagger API Documentation

### Open Swagger UI
Once the server is running, visit:
```
http://localhost:3000/api-docs
```

There, you can:
- View all available endpoints
- Try out requests directly from your browser
- See required request formats and example responses
- If you're getting authorization errors, click **Authorize** in Swagger UI and paste your JWT token. Like the video below:
![video](https://github.com/kakcil/mini-ai-chat-server/blob/main/swagger.gif)


---

## Example Flow
1. **Login** via `/api/auth/login` to receive a token
2. Use the token in Swagger (click "Authorize")
3. Create characters via `/api/characters`
4. Send messages via `/api/chat`
5. View history via `/api/chat/history/...`

---

## Running Tests

The project includes unit tests for critical functionality:

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage
```

### Key Tests
- **Authentication Tests**: Verifies JWT token generation and validation
- **Chat API Tests**: Ensures proper request validation and message handling

### Coverage Details
- **Statement Coverage**: 55.14%
- **Branch Coverage**: 23.33%
- **Function Coverage**: 25%
- **Line Coverage**: 55.97%

The tests focus on critical functionality while maintaining a minimal test suite.
