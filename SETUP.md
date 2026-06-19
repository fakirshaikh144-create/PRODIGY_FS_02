# 🚀 Prodigy EMS - Complete Setup Guide

This guide will help you get Prodigy EMS running in under 15 minutes.

## ✅ Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Node.js 18+** - Download from https://nodejs.org/
- [ ] **MySQL 5.7+** - Download from https://dev.mysql.com/downloads/mysql/ or use XAMPP/MAMP
- [ ] **Git** - For cloning (optional, can download ZIP)

### Verify Installation

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
mysql --version   # Should show 5.7+ or 8.0+
```

## 🗄️ Database Setup

### 1. Create MySQL Database

Open MySQL CLI or MySQL Workbench:

```sql
CREATE DATABASE prodigy_ems;
CREATE USER 'ems_user'@'localhost' IDENTIFIED BY 'ems_password';
GRANT ALL PRIVILEGES ON prodigy_ems.* TO 'ems_user'@'localhost';
FLUSH PRIVILEGES;
```

Or use the default `root` user without creating a new one.

### 2. Verify Connection

```bash
mysql -u root -p
# or
mysql -u ems_user -p
```

If successful, you can now proceed.

## 💻 Backend Setup

### Step 1: Navigate to Server

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs ~100 packages (takes 1-2 minutes). Coffee time ☕

### Step 3: Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and update the DATABASE_URL:

```env
# If using default root user:
DATABASE_URL="mysql://root:password@localhost:3306/prodigy_ems"

# If you created an ems_user:
DATABASE_URL="mysql://ems_user:ems_password@localhost:3306/prodigy_ems"

# Keep other values as default
PORT=4000
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

### Step 4: Initialize Database

Generate Prisma client:
```bash
npm run prisma generate
```

Run migrations to create tables:
```bash
npm run migrate
```

When prompted:
```
? Enter a name for the new migration: › init
```

### Step 5: Seed Database (Test Data)

Populate with sample admin and employees:

```bash
npm run seed
```

You should see:
```
🌱 Seeding database...
✅ Created admin: admin@example.com
✅ Created 2 employees
🎉 Seeding completed!
```

### Step 6: Start Backend Server

```bash
npm run dev
```

You should see:
```
EMS server listening on port 4000
```

✅ **Backend is running!** Leave this terminal open.

## 🎨 Frontend Setup

Open a NEW terminal/tab:

### Step 1: Navigate to Client

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
cp .env.example .env.local
```

The default values should work:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Step 4: Start Frontend Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local: http://localhost:3000
```

✅ **Frontend is running!**

## 🎯 Access the Application

1. Open your browser: **http://localhost:3000**
2. You'll see the home page with a link to the dashboard
3. Click "Go to dashboard" or navigate to **http://localhost:3000/dashboard**
4. You'll be redirected to login page
5. Enter test credentials:
   - **Email:** admin@example.com
   - **Password:** password123

## 🎮 Using the Application

### Dashboard
- View employee statistics
- See recent additions
- Quick stats: Total, Active, On Leave, Inactive

### Employees
- **View All:** List all employees with search/filter
- **Search:** By name, email, ID, department, position
- **Filter:** By status, department
- **Add:** Create new employee
- **View Details:** Click "View" to see full info
- **Edit:** Update employee information
- **Delete:** Remove employee (soft delete)

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Check if MySQL is running
mysql -u root -p -e "SELECT 1;"

# If not running, start MySQL:
# Windows: Services → MySQL80 → Start
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Issue: "Port 3000 already in use"

Next.js will ask to use a different port. Just say yes and it'll use 3001.

### Issue: "Port 4000 already in use"

```bash
# Find process using port 4000
lsof -i :4000

# Kill the process
kill -9 <PID>
```

### Issue: "Module not found" errors

Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

### Issue: Prisma migration fails

```bash
# Reset database (DELETES ALL DATA)
npx prisma migrate reset

# Say yes when prompted, then run seed again
npm run seed
```

## 📁 Project Files You Might Edit

### Backend
- **Routes:** `server/src/routes/` - API endpoints
- **Controllers:** `server/src/controllers/` - Route logic
- **Validators:** `server/src/validators/` - Input validation
- **Schema:** `server/prisma/schema.prisma` - Database structure

### Frontend
- **Pages:** `client/app/*/page.tsx` - Routes
- **Components:** `client/components/ui.tsx` - Reusable UI
- **API:** `client/lib/api.ts` - Backend calls
- **Styles:** `client/app/globals.css` - Global CSS

## 🚀 Next Steps

1. **Customize:** Edit brand name, colors, fields
2. **Add Features:** New employee fields, reports, exports
3. **Deploy:** Follow deployment guide in README.md
4. **Test:** Create employees, edit, delete, search

## 📞 Common Commands

### Backend
```bash
npm run dev              # Start dev server with auto-reload
npm run prisma generate # Update Prisma client after schema changes
npm run migrate         # Create new migration
npm run seed           # Populate test data
npm run lint           # Check code quality
```

### Frontend
```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run start          # Run production build
npm run lint           # Check code quality
```

## ✨ Features Overview

| Feature | Status |
|---------|--------|
| Admin Login | ✅ Working |
| Employee CRUD | ✅ Working |
| Search & Filter | ✅ Working |
| Dashboard Stats | ✅ Working |
| API Authentication | ✅ Working |
| Database Migrations | ✅ Working |
| Input Validation | ✅ Working |
| Error Handling | ✅ Working |
| Responsive Design | ✅ Working |

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **Express.js:** https://expressjs.com/
- **Prisma:** https://www.prisma.io/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs

## 💡 Pro Tips

1. **Use VS Code DevTools** - Browser DevTools for frontend debugging
2. **Check Terminal Logs** - Backend errors show in terminal running `npm run dev`
3. **Clear Browser Cache** - If UI looks strange, clear cache or use Incognito mode
4. **Test API Directly** - Use Postman/Insomnia to test backend endpoints
5. **Read Error Messages** - They often tell you exactly what's wrong

## 🎉 You're All Set!

Your Employee Management System is now running with:
- ✅ Fully functional frontend (Next.js)
- ✅ Fully functional backend (Express)
- ✅ Database setup (MySQL)
- ✅ Sample data loaded
- ✅ Ready for development

**Happy coding!** 🚀
