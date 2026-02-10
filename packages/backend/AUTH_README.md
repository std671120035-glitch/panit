# JWT Auth System with Role-Based Access Control

This is a basic JWT authentication system with role-based access control built with Express, Prisma, and SQLite.

## Features

- User registration and login
- JWT token generation and verification
- Role-based access control (ADMIN, USER, MODERATOR)
- Protected routes
- Password hashing with bcryptjs

## API Endpoints

### Auth Routes

#### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response**: JWT token and user info

#### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: JWT token and user info

#### Get Current User
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Current user info

### Protected Routes

#### Protected Route (requires authentication)
- **GET** `/protected`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Protected data with userId and userRole

#### Admin Route (requires ADMIN role)
- **GET** `/admin`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Admin only data (403 if not ADMIN)

## Quick Test with cURL

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Access protected route (replace TOKEN with the JWT from login)
```bash
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer TOKEN"
```

### 4. Access admin route (will fail if user is not ADMIN)
```bash
curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer TOKEN"
```

### 5. Get current user info
```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Database Schema

### User Model
- `id`: Integer (primary key, auto-increment)
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String (optional)
- `role`: String (default: "USER") - values: "ADMIN", "USER", "MODERATOR"
- `isActive`: Boolean (default: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Environment Variables

Configure in `.env`:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRE="7d"
PORT=3000
```

## How to Use Role-Based Protection

In your routes:

```typescript
import { requireRole, verifyToken } from "./middleware/auth";

// Admin only route
app.get("/admin-only", verifyToken, requireRole("ADMIN"), (req, res) => {
  res.json({ message: "Admin only" });
});

// Multiple roles allowed
app.get("/moderator-area", verifyToken, requireRole("ADMIN", "MODERATOR"), (req, res) => {
  res.json({ message: "Admin and Moderator access" });
});
```

## Next Steps

- Change JWT_SECRET to a strong, random key in production
- Add password strength validation
- Implement refresh tokens
- Add email verification
- Add rate limiting
- Add user management endpoints (update profile, change password)
- Add admin endpoints (promote user to admin, etc.)
