## Nike Flow 🏃‍♂️👟

A sleek and modern **Nike** e-commerce website built with ⚛️ **React** and 🎨 **Tailwind CSS**.  
This project showcases a fully **responsive** design, smooth ✨ animations, and a dark-themed UI inspired by Nike's iconic branding.  
Deployed on ▲ **Vercel** for lightning-fast performance 🚀.

---

## Features

- 🛍️ **E-commerce Functionality** - Product browsing, cart management, and category filtering
- 🎨 **Dark Theme** - Modern dark mode design with gradient effects
- ✨ **Smooth Animations** - Powered by Framer Motion and custom CSS animations
- 📱 **Fully Responsive** - Optimized for all devices
- 🎯 **Interactive UI** - Mouse follower effects and hover animations
- 🗺️ **Contact Page** - Integrated Google Maps and contact form

---

## Tech Stack

- **React** – Frontend library  
- **Tailwind CSS** – Styling framework  
- **Vite** – Development and build tool  
- **Framer Motion** – Animation library
- **React Router** – Navigation
- **Vercel** – Deployment platform  

---



The application will be available at `http://localhost:5173`

---

## Usage

- **Home Page** - Browse featured products with animated hero section
- **Category Pages** - Filter products by Men's, Women's, and Kids categories
- **Product Details** - View detailed product information with multiple images
- **Shopping Cart** - Add/remove items and view cart totals
- **Contact** - Get in touch via contact form or view location on map
- **Auth** - Sign up (`/register`), sign in (`/login`), and view profile (`/profile`) when the backend is running

### Frontend auth (with backend)

The app includes login and register pages that call the FastAPI backend. To use them:

1. Start the backend: `cd backend && uvicorn main:app --reload --port 8000`
2. Start the frontend: `npm run dev`
3. Open **http://localhost:5173** and use **Sign in** in the navbar, or go to `/login` or `/register`.  
   The frontend uses `http://localhost:8000` by default; set `VITE_API_URL` in `.env` if your API runs elsewhere.

---

## Project Structure

```
nike-flow/
├── backend/            # Auth API (FastAPI + SQLite) – optional Backend/Python demo
│   ├── main.py         # Register, login, protected /me
│   ├── auth.py         # JWT & password hashing
│   ├── database.py     # SQLite & User model
│   └── requirements.txt
├── src/
│   ├── components/     # Reusable UI components
│   ├── Pages/          # Page components
│   ├── context/        # React Context for state management
│   ├── Utils/          # Data and utilities
│   └── assets/         # Images and static files
├── public/             # Public assets
└── package.json        # Dependencies
```

---

## Build

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

---

## Solo HR – Test Tasks (Frontend / Full-Stack)

Evaluation tasks for the Full Stack Developer position:

1. **Rating stars** – Change the rating stars color to yellow  
2. **Products layout** – Arrange the Products section into 3 columns instead of 4  
3. **Cursor** – Modify the cursor shape (not circle)  
4. **Hover animation** – Add zoom effect with light-grey top-to-bottom mask on hover  

---

### Backend / Python alternative

If you are applying as a **Backend/Python developer**, you may instead be asked to implement a **simple authentication feature**, for example:

- **User registration** – e.g. sign up with email/username and password  
- **User login** – e.g. sign in and receive a session or token (e.g. JWT)  
- **Protected route or endpoint** – e.g. an API or page that requires being logged in  

You can use any Python stack you prefer (e.g. Flask, FastAPI, Django) and keep it minimal (in-memory or SQLite storage is fine). The goal is to show clear, secure auth logic and API design.

**This repo includes an example implementation** in the `backend/` folder (FastAPI + SQLite):

- **Register** – `POST /register` (email, username, password)
- **Login** – `POST /login` (email, password) → returns JWT
- **Protected route** – `GET /me` (requires `Authorization: Bearer <token>`)

```bash
cd backend && python -m venv venv && venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Docs: **http://localhost:8000/docs**. See `backend/README.md` for details.

---

### Once completed

- **Record** your full implementation process.
- **Demonstrate** running the project and clearly explain your approach.
- **Use a laptop or computer** for the recording (not a mobile device).
- **Be ready** to walk through your implementation and explain your logic during the interview.

---

## License

This project is for educational purposes and portfolio showcase.

