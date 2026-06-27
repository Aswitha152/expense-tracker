# 💰 Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) web application to track income and expenses, visualize spending by category, and monitor balance in real time.

**🔗 Live App:** https://expense-tracker-neon-nine-63.vercel.app/
**📂 Backend API:** https://expense-tracker-backend-u2qf.onrender.com
**💻 GitHub:** https://github.com/Aswitha152/expense-tracker

---

## ✨ Features

- Add income and expense transactions with category and amount
- Delete transactions
- Real-time balance calculation
- Income vs Expense bar chart
- Expense breakdown by category (pie chart)
- Fully responsive UI

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, Recharts, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose ODM)
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## 🏗️ Architecture

```
Browser → React (Vercel) → REST API (Express, Render) → MongoDB Atlas
```

The frontend makes HTTP requests via Axios to a REST API. The API exposes
`GET / POST / DELETE` endpoints under `/api/transactions`, backed by a
Mongoose schema and a MongoDB Atlas cluster.

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/Transaction.js # Mongoose schema
│   ├── routes/transactions.js# GET, POST, DELETE routes
│   └── index.js               # Express app entry point
└── frontend/
    └── src/
        ├── components/Dashboard.js  # Main UI + charts
        └── App.js
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/transactions` | Fetch all transactions |
| POST | `/api/transactions` | Add a new transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction by ID |

## 🚀 Running Locally

```bash
# Backend
cd backend
npm install
npm start        # runs on http://localhost:5000

# Frontend
cd frontend
npm install
npm start        # runs on http://localhost:3000
```

Create a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## 📈 Future Improvements

- User authentication (JWT/Firebase) so each user has their own transactions
- Edit transaction functionality
- Monthly/weekly filtering
- Export transactions to CSV
- Pagination for large transaction lists

## 👩‍💻 Author

**Aswitha R**
[LinkedIn](https://linkedin.com/in/aswitha-r) · [GitHub](https://github.com/Aswitha152)
