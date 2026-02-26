# Interview 
Hi, I’m Kayla. 
I’m a senior full stack engineer with about 10 years of experience, mostly building scalable healthcare and SaaS platforms. 
I specialize in React on the frontend and Python with Django or Flask on the backend, designing clean APIs and secure authentication systems. 
I’ve led performance optimizations, built interactive UI components, and delivered secure, high-availability applications that support real users at scale.

---------
Start explaination
---------

## Task 1 – Rating stars color to yellow

I’ll walk through the first task: changing the rating stars to yellow.

The stars are on the product detail page. (Open the app and go to any product, e.g. `/products/2`.)

They’re rendered in the `ProductDisplay` component. (Open `src/components/ProductDisplay.jsx`.) Look at lines 26–30: the rating row uses the `Star` icon from `lucide-react`. Originally the filled stars used the teal color `#138695`. I changed the four filled stars to yellow using `#eab308` and added `className='text-yellow-500'` so the stroke matches. The fifth star stays gray so it still reads as “empty.” So the only file changed for this task was `ProductDisplay.jsx`, and the stars now show yellow on the product page.

---

## Task 2 – Products section into 3 columns

For the second task we had to show the products in 3 columns instead of 4.

The product grid lives in `ProductList`. (Open `src/components/ProductList.jsx`.) Look at line 10: the grid uses Tailwind classes `grid-cols-1`, `sm:grid-cols-2`, and `lg:grid-cols-4`. I changed `lg:grid-cols-4` to `lg:grid-cols-3`. So on large screens the “Top Sellers” products now appear in 3 columns; on smaller breakpoints it still goes 1 column on mobile and 2 on `sm`. That’s the only change for this task.

---

## Task 3 – Cursor shape to rectangle

The third task was to change the custom cursor from a circle to a rectangle, without modifying the `react-mouse-follower` library.

The library draws a circular follower with `border-radius: 9999px` and doesn’t expose a shape option. So we override it from our app. (Open `src/index.css`.) Around lines 90–96 there’s a comment “Our app: cursor shape rectangle” and a rule that targets `#mouse-follower` and its nested divs. We set `border-radius: 0 !important` on those so the cursor renders as a rectangle. The library stays unchanged; the override is only in our global CSS.

---

## Task 4 – Hover animation: zoom and light-grey top-to-bottom mask

The fourth task was to add a hover effect on product cards: zoom and a light-grey top-to-bottom mask.

(Open `src/components/Item.jsx`.) Each product card is an `Item`. The image container already had `overflow-hidden` and we use the `group` class on the wrapper. On the image, lines 9–12, I added `transition-transform duration-300 ease-out` and `group-hover:scale-110` so the image zooms on hover. Below it, lines 14–18, there’s an overlay div: `absolute inset-0`, `pointer-events-none`, and a gradient `from-gray-300/40 via-gray-400/20 to-transparent`. It’s hidden by default with `opacity-0` and shown on hover with `group-hover:opacity-100` and the same transition. So we get a zoom plus a light-grey top-to-bottom mask on hover, and the overlay doesn’t block clicks.

---

## Task 5 – Simple authentication (FastAPI + SQLite, frontend integration)

The fifth part was implementing simple auth and wiring it into the frontend.

### Backend

(Start from the `backend` folder.) The API is FastAPI with SQLite.

(Open `backend/database.py`.) We define the SQLite URL, create the engine and session, and a `User` model with `id`, `email`, `username`, `hashed_password`, and `created_at`. `init_db()` creates the tables; `get_db()` is the dependency that yields a session.

(Open `backend/auth.py`.) We use `bcrypt` for hashing—no passlib, to avoid version issues. `hash_password` and `verify_password` handle the 72-byte bcrypt limit. We create and decode JWTs with `python-jose`; `get_current_user` is a FastAPI dependency that reads the Bearer token and returns the user or 401.

(Open `backend/main.py`.) We have a lifespan that calls `init_db()` on startup. CORS is set for the frontend origin. Endpoints: `POST /register` takes email, username, password and creates a user; `POST /login` takes email and password and returns a JWT; `GET /me` is protected and returns the current user when the Authorization header has a valid token. So we have register, login, and one protected route, all in our app only.

### Frontend

(Open `src/utils/api.js`.) This is the auth API client. We have `login`, `register`, and `fetchMe(token)` calling the backend. The token is stored in localStorage via `getToken` and `setToken`. The base URL is `VITE_API_URL` or `http://localhost:8000`.

(Open `src/context/AuthContext.jsx`.) The provider holds `user` and exposes `login`, `register`, and `logout`. On mount it loads the token from localStorage and calls `fetchMe` to restore the user. After login or register we set the token and then fetch `/me` to set the user.

(Open `src/main.jsx`, lines 9–16.) The app is wrapped in `AuthProvider` so auth state is available everywhere.

(Open `src/App.jsx`, lines 13–15 and 45–56.) We import the auth pages and add routes for `/login`, `/register`, and `/profile`. So the router knows about the auth routes.

(Open `src/Pages/Login.jsx` and `src/Pages/Register.jsx`.) Login has email and password; register has email, username, password, and confirm password. They call the context’s `login` or `register`, show errors from the API, and redirect to home on success. Profile (open `src/Pages/Profile.jsx`) shows the current user from context or a message and link to sign in if not logged in.

(Open `src/components/Navbar.jsx` and `src/components/Navbar2.jsx`.) Both navbars use `AuthContext`. When there’s no user we show a “Sign in” link to `/login`; when there is a user we show the username (link to `/profile`) and a Logout button. So the home page and the rest of the app both have access to login.

(Open `src/components/ResponsiveMenu.jsx`.) The mobile menu shows “Hello, username” and Profile / Logout when logged in, and “Sign in” when not.

To try it: (run the backend with `uvicorn main:app --reload --port 8000` and the frontend with `npm run dev`). Then you can register, log in, open Profile, and log out from the nav.

---

## Summary

So in total we have five pieces: (1) yellow rating stars in `ProductDisplay.jsx`, (2) 3-column product grid in `ProductList.jsx`, (3) rectangular cursor via CSS override in `index.css`, (4) zoom and light-grey mask on product cards in `Item.jsx`, and (5) auth with FastAPI + SQLite in the backend and login/register/profile plus nav integration in the frontend.
