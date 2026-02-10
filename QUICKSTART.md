# Panit - Full Stack Auth System

Complete JWT authentication system with role-based access control.

## ✅ What's Implemented

### Backend (Port 3000)
- ✅ JWT authentication (register, login, profile)
- ✅ Prisma ORM with SQLite
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (ADMIN, USER, MODERATOR)
- ✅ Protected routes
- ✅ Auto-generated API documentation at `/api/apis`

### Frontend (Port 5173)
- ✅ Vue 3 + Nuxt 4 with TypeScript
- ✅ Tailwind CSS v4
- ✅ Auth composable with localStorage persistence
- ✅ Login/Register pages
- ✅ User profile dashboard
- ✅ Admin panel (role-gated)
- ✅ Home page with features showcase

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Backend (Terminal 1)
```bash
pnpm -F @panit/backend dev
# Backend runs on http://localhost:3000
```

### 3. Start Frontend (Terminal 2)
```bash
pnpm -F @panit/frontend dev
# Frontend runs on http://localhost:5173
```

### 4. Test the System

#### Open Frontend
- Visit http://localhost:5173

#### Register New Account
- Click "Sign Up"
- Fill in: email, password, name (optional)
- Click "Create Account"

#### Test Login
- Logged in automatically → redirected to `/profile`
- See your user info with role badge
- Test logout and login again

#### View API Documentation
- Backend: http://localhost:3000/api/apis

## 📋 API Endpoints

| Method | Path | Auth? | Description |
|--------|------|-------|-------------|
| GET | `/` | ❌ | Health check |
| GET | `/api/apis` | ❌ | List all APIs |
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/protected` | ✅ | Protected route |
| GET | `/admin` | ✅ ADMIN | Admin only |

## 🌐 Frontend Routes

| Path | Purpose |
|------|---------|
| `/` | Home page |
| `/auth/login` | Login form |
| `/auth/register` | Register form |
| `/profile` | User dashboard (protected) |
| `/admin` | Admin panel (admin only) |

## 🔑 Test Credentials

After registering, use those credentials to login. First user registered becomes a regular USER role.

To test admin features:
- You'll need to manually update the database or use an admin account
- In development, you can manually change a user's role in SQLite

## 🛠️ Database

- **Type**: SQLite
- **Location**: `packages/backend/prisma/dev.db`
- **ORM**: Prisma
- **Schema**: User model with email, password, name, role, isActive

### Reset Database (if needed)
```bash
cd packages/backend
pnpm exec prisma migrate reset --force
```

## 📦 Tech Stack

**Backend:**
- Express.js
- Prisma ORM
- SQLite
- JWT (jsonwebtoken)
- Bcryptjs
- TypeScript

**Frontend:**
- Vue 3
- Nuxt 4
- Tailwind CSS v4
- Axios
- TypeScript

## 🔍 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
# Kill the process or use a different port
```

### Frontend CORS errors
- Ensure backend is running on `http://localhost:3000`
- Check `API_BASE_URL` in `packages/frontend/composables/useAuth.ts`

### State not persisting
- Open DevTools → Application → LocalStorage
- Should see `auth.token` and `auth.user` after login
- Clear localStorage if having issues: `localStorage.clear()`

### Page redirects to login unexpectedly
- Check browser console for API errors
- Verify backend is responding: `curl http://localhost:3000/`

## 📝 Next Steps

- Add email verification
- Implement password reset
- Add user profile editing
- Create admin user management
- Add refresh tokens
- Implement rate limiting
- Add logging & monitoring

## 🎉 You're All Set!

The system is now ready to use. Start with the quick start steps above and enjoy!
