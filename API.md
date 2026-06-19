# 🔌 API Reference - Prodigy EMS

All API endpoints with request/response examples. Use with Postman/Insomnia.

**Base URL:** `http://localhost:4000/api`

---

## 🔐 Authentication

### 1. Login
Create a JWT token with admin credentials.

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "user-uuid",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

**Error (401):**
```json
{
  "error": "Invalid email or password."
}
```

---

### 2. Get Current Admin
Retrieve authenticated admin details.

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "admin": {
    "id": "user-uuid",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

---

### 3. Logout
Clear session (no-op for JWT, but good practice).

```http
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Logout successful."
}
```

---

## 👥 Employees

### 1. List Employees
Get paginated employee list with filtering and search.

```http
GET /employees?page=1&limit=10&search=John&department=Engineering&status=ACTIVE
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)
- `search` (string) - Search by name, email, ID, dept, position
- `department` (string) - Filter by department
- `status` (string) - Filter by ACTIVE | ON_LEAVE | INACTIVE

**Response (200):**
```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  },
  "data": [
    {
      "id": "emp-uuid-1",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "department": "Engineering",
      "position": "Senior Developer",
      "salary": 120000,
      "dateOfJoining": "2020-01-15T00:00:00.000Z",
      "status": "ACTIVE",
      "address": "123 Main St",
      "emergencyContact": "9876543210",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Employee Details
Retrieve a single employee.

```http
GET /employees/emp-uuid-1
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "employee": {
    "id": "emp-uuid-1",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "department": "Engineering",
    "position": "Senior Developer",
    "salary": 120000,
    "dateOfJoining": "2020-01-15T00:00:00.000Z",
    "status": "ACTIVE",
    "address": "123 Main St",
    "emergencyContact": "9876543210",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "error": "Employee not found."
}
```

---

### 3. Create Employee
Add a new employee.

```http
POST /employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "employeeId": "EMP003",
  "fullName": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "5555555555",
  "department": "HR",
  "position": "HR Specialist",
  "salary": 85000,
  "dateOfJoining": "2024-01-10",
  "status": "ACTIVE",
  "address": "789 Oak Lane",
  "emergencyContact": "4444444444"
}
```

**Response (201):**
```json
{
  "employee": {
    "id": "emp-uuid-3",
    "employeeId": "EMP003",
    "fullName": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "5555555555",
    "department": "HR",
    "position": "HR Specialist",
    "salary": 85000,
    "dateOfJoining": "2024-01-10T00:00:00.000Z",
    "status": "ACTIVE",
    "address": "789 Oak Lane",
    "emergencyContact": "4444444444",
    "createdAt": "2024-06-18T12:00:00.000Z",
    "updatedAt": "2024-06-18T12:00:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "error": "Validation failed.",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address."
    }
  ]
}
```

**Error (409):**
```json
{
  "error": "Employee email already exists."
}
```

---

### 4. Update Employee
Modify employee information.

```http
PUT /employees/emp-uuid-1
Authorization: Bearer <token>
Content-Type: application/json

{
  "position": "Lead Developer",
  "salary": 130000,
  "status": "ON_LEAVE"
}
```

All fields are optional. Only send fields you want to update.

**Response (200):**
```json
{
  "employee": {
    "id": "emp-uuid-1",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "department": "Engineering",
    "position": "Lead Developer",
    "salary": 130000,
    "dateOfJoining": "2020-01-15T00:00:00.000Z",
    "status": "ON_LEAVE",
    "address": "123 Main St",
    "emergencyContact": "9876543210",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-06-18T12:05:00.000Z"
  }
}
```

---

### 5. Delete Employee
Soft delete an employee (data preserved).

```http
DELETE /employees/emp-uuid-1
Authorization: Bearer <token>
```

**Response (204):** No content (empty response)

**Error (404):**
```json
{
  "error": "Employee not found."
}
```

---

## 📊 Dashboard

### Get Statistics
Retrieve dashboard overview data.

```http
GET /dashboard/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalEmployees": 45,
  "activeEmployees": 42,
  "onLeaveEmployees": 2,
  "inactiveEmployees": 1,
  "recentEmployees": [
    {
      "id": "emp-uuid-3",
      "employeeId": "EMP003",
      "fullName": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "5555555555",
      "department": "HR",
      "position": "HR Specialist",
      "salary": 85000,
      "dateOfJoining": "2024-01-10T00:00:00.000Z",
      "status": "ACTIVE",
      "address": "789 Oak Lane",
      "emergencyContact": "4444444444",
      "createdAt": "2024-06-18T12:00:00.000Z",
      "updatedAt": "2024-06-18T12:00:00.000Z"
    }
  ]
}
```

---

## 🔄 Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Request completed |
| 201 | Created - New resource created |
| 204 | No Content - Deletion successful |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate email/ID |
| 500 | Server Error - Internal problem |

---

## 🧪 Testing in Postman

### Setup

1. **Create Environment Variable:**
   - Click "Environments" → "Create"
   - Add variable: `token` with empty value
   - Add variable: `baseUrl` = `http://localhost:4000/api`

2. **Set Authorization Header:**
   - For each request, go to "Authorization" tab
   - Type: Bearer Token
   - Token: `{{token}}`

### Testing Flow

1. **Login** and copy token to environment
2. **Get Me** to verify token works
3. **List Employees** to see all
4. **Create Employee** with test data
5. **Get Dashboard Stats** for overview

---

## 📝 Validation Rules

| Field | Rules |
|-------|-------|
| email | Valid format, unique, required |
| employeeId | Min 3 chars, unique, required |
| fullName | Min 3 chars, required |
| phone | Min 10 chars, required |
| salary | Positive number, required |
| status | ACTIVE \| ON_LEAVE \| INACTIVE |

---

## 🔐 Security Notes

- Always use HTTPS in production
- Store token in secure httpOnly cookie
- Never log tokens
- Rotate JWT_SECRET regularly
- Use strong passwords
- Implement additional rate limiting for production

---

## 🚀 Example cURL Commands

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### List Employees
```bash
curl -X GET "http://localhost:4000/api/employees?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Employee
```bash
curl -X POST http://localhost:4000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId":"EMP999",
    "fullName":"Test User",
    "email":"test@example.com",
    "phone":"1234567890",
    "department":"IT",
    "position":"Developer",
    "salary":100000,
    "dateOfJoining":"2024-01-01",
    "status":"ACTIVE",
    "address":"Test Address",
    "emergencyContact":"9876543210"
  }'
```

---

**Last Updated:** June 2024
