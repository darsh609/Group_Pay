
# 💸 Splitwise Clone – Expense Sharing App (Backend Oriented)

A full-stack Splitwise-like application with a **backend-first design**, built using **Node.js, Express, MongoDB, and JWT authentication**, with a React frontend consuming REST APIs.

This project focuses on **API design, data consistency, authorization, and real-world backend workflows** like group expenses, settlements, and balance tracking.

---

## 🚀 Live URLs

* **Backend API (Primary Focus)**
  👉 [https://splitwise-clone-assgn-1.onrender.com/api](https://splitwise-clone-assgn-1.onrender.com/api)

* **Frontend**
  👉 [https://splitwise-clone-assgn-frontend.onrender.com](https://splitwise-clone-assgn-frontend.onrender.com) *(if applicable)*

---

## 📌 Backend Overview

* RESTful APIs built using **Express**
* MongoDB used for persistence via **Mongoose**
* JWT used for authentication and route protection
* All expense, balance, and settlement operations are **API-driven**
* Frontend acts only as a consumer of backend APIs

---

## ⚙️ Backend Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables (`.env`)

```env
MONGODB_URL=mongodb+srv://darshkumar0609_db_user:WmLxQQ2WzlDuP77g@cluster0.hvcej3p.mongodb.net/SplitwiseDb
PORT=5000
JWT_SECRET=FullStackByDarsh
```

### 4️⃣ Run the backend server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000/api
```

---

## 📦 Backend Dependencies

```json
"dependencies": {
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.2",
  "nodemon": "^3.1.11"
}
```

---

## 🔐 Authentication Flow (API Usage)

1. **Register User**

```
POST /api/auth/register
```

2. **Login User**

```
POST /api/auth/login
```

* Response includes a **JWT token**
* Token must be sent in headers for protected routes:

```
Authorization: Bearer <token>
```

---

## 👥 Group APIs

### Create Group

```
POST /api/groups
```

* Auth required
* Logged-in user is auto-added to the group

### Get My Groups

```
GET /api/groups/my-groups
```

### Get Group Members

```
GET /api/groups/:groupId/members
```

### Delete Group

```
DELETE /api/groups/:groupId
```

* Deletes:

  * Group
  * All related expenses
  * All related settlements

---

## 💰 Expense APIs

### Add Expense

```
POST /api/expenses
```

Supports:

* `EQUAL`
* `EXACT`
* `PERCENTAGE`

### Get Group Expenses

```
GET /api/expenses/group/:groupId
```

### Delete Expense

```
DELETE /api/expenses/:expenseId
```

---

## 📊 Balance APIs

### Get Group Balances

```
GET /api/expenses/group/:groupId/balances
```

### Get Logged-in User Overall Balance

```
GET /api/expenses/user/:userId/balance
```

### Get User Balance in a Group

```
GET /api/expenses/group/:groupId/user/:userId
```

---

## 🤝 Settlement APIs

### Add Settlement

```
POST /api/settlements
```

### Get My Settlements

```
GET /api/settlements/my-settlements
```

### Delete Settlement

```
DELETE /api/settlements/:settlementId
```

---

## 🧪 Testing the Backend

You can test all APIs using:

* **Postman**
* **Thunder Client**
* **cURL**

Make sure to:

* Login first
* Copy JWT token
* Add token to Authorization header for protected routes

---

## 🔄 Frontend ↔ Backend Connection

Frontend uses:

```env
REACT_APP_BASE_URL=https://splitwise-clone-assgn-1.onrender.com/api
```

All API calls are made using **Axios**, and tokens are stored in `localStorage`.

---

## 📌 Why This Backend Design?

* Clear separation of concerns
* Scalable REST API structure
* Secure authorization checks at route level
* Designed to work independently of frontend
* Can easily be used by:

  * Web apps
  * Mobile apps
  * Other clients

---

## 👨‍💻 Author

**Darsh Kumar**
Final Year B.Tech Student
NIT Warangal

> This assignment demonstrates my understanding of backend development, API design, authentication, and real-world data handling.

