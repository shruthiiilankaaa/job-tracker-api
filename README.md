### 🚀 Job Tracker API

A RESTful backend API for tracking job applications during internship/job search. Built with Node.js, Express, MongoDB, and JWT Authentication.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### ✨ Features

- 🔐 JWT Authentication (Register / Login)
- 🔒 Password hashing with bcrypt
- 📋 Full CRUD for job applications
- 📊 Application stats by status
- 🔍 Filter by status & search by company
- 📄 Pagination support
- 🛡️ Rate limiting to prevent brute force attacks
- ✅ Input validation with express-validator

### 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| express-rate-limit | Rate limiting |

### 📁 Project Structure

```
job-tracker-api/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register & Login logic
│   └── jobController.js   # CRUD logic for jobs
├── middleware/
│   └── authMiddleware.js  # JWT protection middleware
├── models/
│   ├── User.js            # User schema
│   └── Job.js             # Job application schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   └── jobRoutes.js       # Job endpoints
├── .env                   # Environment variables
└── server.js              # Entry point
```

### 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOURUSERNAME/job-tracker-api.git
cd job-tracker-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 📡 API Reference

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get token | ❌ |

### Job Routes (All Protected 🔒)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/jobs` | Add a new job application |
| GET | `/api/jobs` | Get all your applications |
| GET | `/api/jobs?status=Applied` | Filter by status |
| GET | `/api/jobs?company=Google` | Search by company |
| GET | `/api/jobs?page=1&limit=10` | Paginated results |
| GET | `/api/jobs/stats` | Get stats by status |
| PUT | `/api/jobs/:id` | Update an application |
| DELETE | `/api/jobs/:id` | Delete an application |

### Example Request

**Register:**
```json
POST /api/auth/register
{
  "name": "Alex Johnson",
  "email": "alex@gmail.com",
  "password": "alex123"
}
```

**Add a Job (with Bearer token):**
```json
POST /api/jobs
Authorization: Bearer <your_token>

{
  "companyName": "Google",
  "role": "SDE Intern",
  "status": "Applied",
  "appliedDate": "2024-01-15",
  "notes": "Applied via LinkedIn"
}
```

**Stats Response:**
```json
GET /api/jobs/stats

{
  "Applied": 3,
  "OA": 2,
  "Interview": 1,
  "Rejected": 1,
  "Offer": 1,
  "total": 8
}
```

### 🔐 Authentication

All job routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are valid for **7 days**.

### 📊 Job Status Flow

```
Applied → OA → Interview → Offer
                        ↘ Rejected
```

### 🌐 Live API

> Deployed on Render: `https://job-tracker-api-1-sa7a.onrender.com`
