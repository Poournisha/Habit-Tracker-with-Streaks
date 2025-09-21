# Minimalist Habit Tracker with Streaks

A simple and efficient web application to track daily habits and maintain streaks. Focused on minimalism and productivity, this app excludes gamification features. Built with the MERN stack and Docker deployment.

---

## **Table of Contents**
- [Aim](#aim)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## **Aim**
- To provide a clean, minimalist interface for tracking daily habits and visualizing streaks.  
- To implement a full-stack MERN application with secure user authentication and persistent habit storage.

---

## **Features**
- User registration and login with secure authentication (JWT).  
- Create, update, and delete habits.  
- Track daily habit completion and maintain streak counts.  
- Minimalist dashboard displaying habits and streaks.  
- Fully containerized using Docker for easy deployment.

---

## **Tech Stack**
- **Frontend**: React.js (with Axios or Fetch for API calls)  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (MongoDB Compass for visualization)  
- **Deployment**: Docker & Docker Compose

---

## **Project Structure**

---

## **Installation**
### Prerequisites
- Node.js & npm  
- Docker & Docker Compose  
- MongoDB (optional if using Docker container for DB)

### Steps
1. Clone the repository:
```bash
git clone https://github.com/USERNAME/habit-tracker.git
cd habit-tracker
cd backend
npm install
cd ../frontend
npm install
docker-compose up --build

## Usage

Open your browser and go to http://localhost:3000.

Register a new account or login with existing credentials.

Add habits, mark them as done each day, and watch your streak grow!

Check your dashboard for habit stats and streaks.
