# 🎙️ SuperPod

SuperPod is a modern **podcast web service** designed to let users **discover, play, and manage** their favorite podcasts through a clean and intuitive UI.

---

## 🌐 Live Demo  
[🚀](https://super-pod-frontend.vercel.app/)

---

## 🧱 Project Structure

```
superpod/
├── backend/          # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/         # React.js + Tailwind CSS frontend
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.jsx
├── .env
├── package.json
└── README.md
```

---

## 💡 Features

- 🎧 Explore and listen to trending podcasts
- 👤 User authentication and profiles
- 🌓 Light/Dark theme toggle
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (for auth)**
- **dotenv**

---

## 🚧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/superpod.git
cd superpod
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the application
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start
```

---

## 📸 Screenshots

_Add screenshots or demo GIFs of your app here._

---

## 📂 Folder Highlights

- `/frontend/components` – UI components like podcast cards, navbar, player.
- `/frontend/pages` – Pages like Home, Login, Podcast Details.
- `/backend/routes` – API routes for auth, podcast data, user preferences.
- `/backend/models` – Mongoose models for Users, Podcasts, Likes.

---

## 🧠 Future Improvements

- 🎙️ Add podcast creation/upload support
- 💬 Add user comments and reviews
- 🔔 Push notifications for new episodes
- 🌍 Support multiple languages

---

## 🤝 Contributing

Feel free to open issues or submit PRs!  
```bash
# Fork the repo
# Create your feature branch (git checkout -b feature/yourFeature)
# Commit your changes (git commit -m "Add your message")
# Push to the branch (git push origin feature/yourFeature)
# Open a Pull Request
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
