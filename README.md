
# React Dashboard for Agent Task Management

A full-stack dashboard application built with **React**, **Tailwind CSS**, **Node.js**, and **MongoDB**. This app supports user authentication, agent management, CSV/Excel uploads, and automatic task distribution among agents.

## ✨ Features

- 🔐 User Signup & Login (with JWT)
- 👥 Agent Management (Add, Edit, Delete, Search)
- 📄 CSV/Excel Upload (with validation)
- 📊 Even Distribution of Tasks among 5 agents
- ✅ Toast Notifications (Success/Error)
- ⏳ Loading Spinner for async actions
- 🌐 Modular Backend (Node.js + Express + MongoDB)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)
- JWT for authentication
- csv-parser or xlsx for parsing files

---

## 📂 Folder Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Start Backend

```bash
cd backend
npm install
npm start
```

- Server runs on: `http://localhost:5000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

- App runs on: `http://localhost:5173`

---

## ✅ Usage Guide

### Login / Signup
- New users can register.
- Auth tokens are stored in local storage.

### Agent Management
- Add agents with name and email.
- Search/filter agents.
- Edit/Delete individual agents.

### File Upload
- Upload `.csv` or `.xlsx` files with columns:
  - FirstName
  - Phone
  - Notes
- Data is validated and evenly distributed among 5 agents.

### Task View
- View agent-wise distributed tasks.

---

## 🚧 Environment Variables (Backend)

Create a `.env` file inside the backend directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
```

---

## 📦 Dependencies

Some important packages used:

```bash
# Frontend
npm install axios react-toastify

# Backend
npm install express mongoose dotenv multer jsonwebtoken bcryptjs csv-parser xlsx
```

---

## 📸 Screenshots

> Add screenshots or screen recordings here.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
