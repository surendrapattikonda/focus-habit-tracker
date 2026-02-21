 🎯 Focus & Habit Tracker

A modern full-stack productivity application featuring real-time activity tracking, interactive calendar views, and stunning 3D data visualizations powered by Three.js.

<div align="center">

![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)

[Live Demo](https://focus-habit-tracker.vercel.app/) 
</div>

---

# Project Overview

Focus & Habit Tracker is a structured productivity dashboard where users can:

    Authenticate securely

    Log daily activities

    View history via calendar/date grouping

    Analyze weekly productivity

    Experience smooth UI animations

    Visualize analytics using Three.js 3D bar graphs

The goal was to build a coherent micro-product rather than isolated pages, focusing on clean architecture and engineering decisions.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with protected routes
- 📝 **Activity Logging** - Track daily activities with customizable categories
- 📅 **Calendar View** - Visual history with interactive date selection
- 📊 **3D Analytics** - Immersive Three.js visualization of weekly activity data
- 🎨 **Smooth Animations** - Polished UI with Framer Motion transitions
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Real-time Updates** - Instant feedback with optimistic UI updates

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/surendrapattikonda/focus-habit-tracker.git
   cd focus-habit-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   CLIENT_URL=http://localhost:5173
   ```

   Start backend:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Start development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

---

## 📁 Project Structure

```
focus-tracker/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── dashboard/    # Activity form, list
│   │   │   ├── history/      # Calendar, day modal
│   │   │   ├── analytics/    # 3D charts
│   │   │   └── common/       # Navbar, protected routes
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Main page components
│   │   ├── services/         # API services
│   │   └── App.jsx           # Root component
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/               # Database config
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth, error handling
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── index.js             # Entry point
│   └── package.json
│
└── README.md
```



## 🎨 Three.js Visualization

The analytics page features an interactive 3D bar chart built with Three.js:

### Implementation Highlights
- **Animated Bars:** Bars rise from the ground on page load using `useFrame` hook
- **Stacked Visualization:** Multiple categories per day are stacked vertically
- **Color Coding:** Each category has a distinct color for easy identification
- **Dynamic Scaling:** Bar height proportional to activity duration
- **Interactive Camera:** Orbit controls for 360° viewing



## 🎯 Key Design Decisions

1. **JWT Authentication**
   - Stateless authentication for horizontal scalability
   - 7-day token expiration for security-UX balance

2. **MongoDB**
   - Flexible schema for activity attributes
   - Efficient indexing for date-range queries
   - Easy aggregation for analytics

3. **Three.js over Charts.js**
   - More engaging user experience
   - Demonstrates advanced frontend skills
   - Smooth animations with React Three Fiber

4. **React Context for Auth**
   - Lightweight solution for this scale
   - Avoids Redux complexity
   - Sufficient for auth state management

5. **Tailwind CSS**
   - Rapid UI development
   - Consistent design system
   - Small bundle size with purging

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected API routes with auth middleware
- ✅ Input validation on all endpoints
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ MongoDB injection prevention
- ✅ XSS protection

---


## 👨‍💻 Author

**Your Name**

- GitHub: [@surendrapattikonda](https://github.com/surendrapattikonda)
- LinkedIn: [surendra](https://linkedin.com/in/pattikondasurendra)
- Email: pattikondasurendra05@gmail.com

---


<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ and ☕

</div>
