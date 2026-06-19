# Prodigy Employee Management System (EMS)

A production-ready enterprise HR management platform built with Next.js, Express.js, MySQL, and Prisma ORM.

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 5.7+
- npm or yarn

### Backend Setup (5 minutes)
```bash
cd server
npm install
cp .env.example .env
# Update DATABASE_URL, JWT_SECRET in .env
npm run prisma generate
npm run migrate
npm run seed        # Optional: seed test data
npm run dev         # Starts on http://localhost:4000
```

### Frontend Setup (3 minutes)
```bash
cd client
npm install
cp .env.example .env.local
npm run dev         # Starts on http://localhost:3000
```

### Login
- **Email:** admin@example.com
- **Password:** password123

## ✨ Features

### Authentication
- JWT-based authentication system
- Bcrypt password hashing (10 salt rounds)
- Admin login with secure token management
- Session persistence

### Employee CRUD
- Full CRUD operations on employee records
- Search by name, email, employee ID, department, position
- Filter by status (ACTIVE, ON_LEAVE, INACTIVE) and department
- Soft delete for data preservation
- Pagination support (10 employees per page)
- Real-time validation

### Dashboard
- Real-time statistics (total, active, on-leave, inactive)
- Recent employee activity
- Responsive design for mobile/tablet/desktop
- Admin-only access

### UI/UX
- Minimal, clean design with Tailwind CSS
- Responsive layout (mobile-first)
- Easy-to-use forms with validation
- Clear navigation
- Status badges and indicators

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React App Router framework
- **React 18.3** - UI library  
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS
- **Axios 1.6** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma 5.13** - ORM for MySQL
- **MySQL** - Relational database
- **JWT** - Token authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **Zod** - Input validation
- **Nodemon** - Auto-restart in dev

## 📁 Project Structure

```
├── client/                     # Next.js Frontend
│   ├── app/
│   │   ├── login/page.tsx     # Login page
│   │   ├── dashboard/page.tsx # Dashboard with stats
│   │   ├── employees/
│   │   │   ├── page.tsx       # Employees list
│   │   │   ├── add/page.tsx   # Add employee form
│   │   │   └── [id]/
│   │   │       ├── page.tsx   # Employee detail view
│   │   │       └── edit/page.tsx
│   │   ├── layout.tsx         # Root layout with nav
│   │   ├── layout-dashboard.tsx
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/ui.tsx      # Reusable UI components
│   ├── hooks/useAuth.ts       # Auth hook
│   ├── lib/
│   │   ├── api.ts             # API client
│   │   └── types.ts           # TypeScript types
│   ├── providers/             # Context providers
│   ├── next.config.mjs        # Next.js config
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind config
│   └── package.json
│
└── server/                     # Express Backend
    ├── src/
    │   ├── app.js             # Express setup
    │   ├── config/index.js    # Environment config
    │   ├── controllers/       # Route handlers
    │   ├── middleware/        # Express middleware
    │   ├── routes/            # API routes
    │   ├── validators/        # Zod schemas
    │   ├── prisma/            # Prisma client
    │   ├── utils/             # Utilities
    │   └── seed.js            # Database seeding
    ├── prisma/schema.prisma   # Database schema
    ├── server.js              # Entry point
    ├── package.json
    ├── .env                   # Environment variables
    └── .env.example
```

## 📚 API Endpoints

### Auth
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current admin

### Employees
- `GET /api/employees` - List (paginated, filterable)
- `GET /api/employees/:id` - Get details
- `POST /api/employees` - Create
- `PUT /api/employees/:id` - Update
- `DELETE /api/employees/:id` - Delete (soft)

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## 🔐 Security

- JWT authentication with expiration
- Bcrypt password hashing
- Helmet security headers
- CORS protection
- Rate limiting (120 req/15min)
- Input validation (Zod)
- SQL injection protection (Prisma ORM)
- Soft deletes
- Protected routes

## 📦 Database Schema

### Admin
- id, name, email (unique), password, role, createdAt, updatedAt

### Employee
- id, employeeId (unique), fullName, email (unique), phone
- department, position, salary, dateOfJoining
- status (ACTIVE|ON_LEAVE|INACTIVE), address, emergencyContact
- deletedAt (soft delete), createdAt, updatedAt
- **Indexes:** email, employeeId, department, status

## 🚀 Production Deployment

### Frontend → Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

### Backend → Ubuntu + PM2

```bash
# On your Ubuntu server
ssh user@server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone <repo> && cd project/server
npm install --production
npm run prisma generate
npm run migrate

# Start with PM2
pm2 start server.js --name "ems-api"
pm2 startup
pm2 save

# Monitor
pm2 logs ems-api
pm2 monit
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=4000
DATABASE_URL=mysql://user:pass@localhost:3306/prodigy_ems
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection fails | Verify MySQL running, check DATABASE_URL |
| CORS error | Ensure CLIENT_ORIGIN matches frontend URL |
| Token expired | Clear localStorage and login again |
| Port already in use | `lsof -i :4000` → `kill -9 <PID>` |
| Prisma client error | Run `npm run prisma generate` |

## 📝 Development Commands

### Backend
```bash
npm run dev         # Start with hot reload
npm run lint        # ESLint check
npm run prisma generate
npm run migrate     # Create migration
npm run seed        # Seed database
```

### Frontend
```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run start       # Start production build
npm run lint        # ESLint check
```

## 🎯 Key Architectural Decisions

1. **Next.js App Router** - Modern, file-based routing with server components
2. **Prisma ORM** - Type-safe database access with auto-migrations
3. **Zod Validation** - Both frontend and backend validation with shared schemas
4. **JWT Auth** - Stateless, scalable authentication
5. **Soft Deletes** - Data recovery capability
6. **Minimal CSS** - Clean, maintainable Tailwind styling
7. **API-First Design** - Decoupled frontend/backend

## 📖 Database Schema Evolution

All schema changes use Prisma migrations:
```bash
# Make changes to prisma/schema.prisma
npm run migrate  # Or: npx prisma migrate dev --name feature_name
```

## 🔄 CI/CD Ready

- Linting configured (ESLint)
- TypeScript strict mode
- Environment validation
- Database migrations tracked
- PM2 process management

## 📞 Support & Docs

- See .env.example files for all config options
- API responses follow consistent JSON format
- Error messages are descriptive and actionable
- Check browser console for frontend errors
- Check PM2 logs for backend errors