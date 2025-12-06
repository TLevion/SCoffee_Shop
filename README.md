☕ Coffee Shop App

📱 Project Overview

This is a Coffee Shop application built using React Native (Expo) for the frontend and Node.js + Express + MongoDB for the backend.

The app allows users to:

View coffee menu items from a database

Fetch a random available coffee

Interact with a real backend deployed on Vercel

Run on Android devices using an APK built with EAS

🧰 Tech Stack
Frontend

React Native

Expo

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Deployed on Vercel

✅ Requirements

Before running the project, make sure you have:

Node.js (v18 or later recommended)

Git

Expo Go app (for testing) OR Android device

MongoDB Atlas account

Vercel account (for backend deployment)

Optional but recommended:

Android Studio (for emulator)

EAS CLI

📂 Project Structure
Frontend (React Native)
│── App.js
│── screens/
│── components/
│── assets/

Backend (Vercel)
│── api/
│   └── index.js
│── package.json
│── vercel.json
│── seed.js

🚀 How to Run the Project (Frontend)

Clone the repository:

git clone <repository-url>
cd coffee-shop


Install dependencies:

npm install


Start Expo:

npx expo start


Open the app:

Scan QR code using Expo Go

OR run on Android emulator

🌐 Backend API (Already Deployed)

The backend is deployed on Vercel and connected to MongoDB Atlas.

API Endpoints:

Get all menu items:

GET /api/menu


Get random available item:

GET /api/menu/random


Backend Base URL:

https://backend-for-vercel.vercel.app

🔐 Environment Variables (Backend)

The backend uses environment variables on Vercel:

MONGO_URI = MongoDB Atlas connection string


MongoDB credentials are not stored in the code for security reasons.

📦 APK Download

Android APK built using EAS Build.

👉 APK Download Link:

[Apk File](https://drive.google.com/file/d/1BKIWp3NSpzRKIz-t9Yqp0ntxqejauVsd/view?usp=drive_link)

🎥 Demo Video

Demo is available on YouTube.

👉 YouTube Demo Video:

 Coming soon

👨‍💻 Author

Talha Shahbaz
Student | Beginner Full-Stack Developer
React Native • Node.js • MongoDB
