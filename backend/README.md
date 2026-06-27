
<!-- mongodb+srv://raushanraie:y4TbYlyGCQa7rhd7@expensetracker.4qtcthc.mongodb.net/ -->
💰 Expense Tracker – MERN Stack Application

A full-stack Expense Tracker application that allows users to securely track their income and expenses, visualize financial data, and manage records with JWT-based authentication.

🚀 Features

🔐 User authentication using JWT

👥 Multi-user support (data isolation per user)

➕ Add / View / Delete Income

➖ Add / View / Delete Expenses

📅 Date-based tracking

🧾 Categorized income & expenses

🔒 Secure APIs with middleware

⚡ Fast queries using MongoDB indexing

🛠 Tech Stack
Frontend

React.js

Axios

CSS / Tailwind (if applicable)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (jsonwebtoken)

bcrypt (password hashing)

📂 Project Structure
backend/
│── config/
│   ├── db.js
│
│── controllers/
│   ├── authController.js
│   ├── incomeController.js
│   ├── expenseController.js
│
│── models/
│   ├── userModel.js
│   ├── incomeModel.js
│   ├── expenseModel.js
│
│── middlewares/
│   ├── authMiddleware.js
│
│── routes/
│   ├── authRoutes.js
│   ├── incomeRoutes.js
│   ├── expenseRoutes.js
│
│── server.js
│── .env

🔐 Authentication Flow

User logs in with email & password

Server generates a JWT token

Token is stored on frontend

Token is sent via Authorization: Bearer <token>

Backend middleware verifies token

User-specific data is accessed securely

🧠 Income Data Model (Example)
{
  userId: ObjectId,
  source: "Salary",
  amount: 30000,
  notes: "January salary",
  date: "2024-01-15"
}

🔑 Environment Variables

Create a .env file in the backend root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ Run Locally
Backend
npm install
npm run dev
