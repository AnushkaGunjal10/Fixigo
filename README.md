# Fixigo

Fixigo is a vehicle assistance and mechanic-booking web app built with a React frontend and a PHP + MySQL backend. The project is developed locally with XAMPP and deployed on AWS using a LEMP stack.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: PHP REST APIs
- Database: MySQL
- Maps: Leaflet + OpenStreetMap
- Deployment: AWS EC2
- Server Stack: LEMP (Linux, Nginx, MySQL, PHP)

## Features

- User login and registration
- Mechanic login and dashboard
- Book a mechanic
- View and track bookings
- Add and view vehicles
- Reviews and notifications
- Nearby mechanics with map view
- Floating rule-based chatbot assistant
- Admin add-mechanic page

## Project Structure

```text
fixigo/
├── backend/
│   ├── api/
│   └── config/
├── database/
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## Main Frontend Routes

- `/` - User login / signup
- `/app` - Dashboard
- `/app/add-vehicle` - Add vehicle
- `/app/issues` - Issue selection
- `/app/mechanics` - Nearby mechanics
- `/app/book/:mechanicId` - Booking page
- `/app/tracking/:bookingId` - Booking tracking
- `/app/bookings` - View bookings
- `/app/assistant` - Assistant page
- `/app/profile` - User profile
- `/app/admin` - Admin dashboard
- `/app/admin/add-mechanic` - Add mechanic
- `/mechanic-login` - Mechanic login
- `/mechanic` - Mechanic dashboard

## Backend APIs

- `login.php`
- `register.php`
- `mechanic_login.php`
- `get_mechanics.php`
- `book.php`
- `get_bookings.php`
- `get_mechanic_bookings.php`
- `update_status.php`
- `add_vehicle.php`
- `get_vehicles.php`
- `add_review.php`
- `get_reviews.php`
- `get_notifications.php`
- `add_mechanic.php`

## Local Setup

### 1. Place the project in XAMPP

Keep the project here:

```text
C:\xampp\htdocs\fixigo
```

### 2. Start XAMPP services

Start:

- Apache
- MySQL

### 3. Create the database

Create a MySQL database named:

```text
fixigo
```

You can use:

```text
http://localhost/phpmyadmin
```

Then import your SQL file if available.

### 4. Install frontend dependencies

Open a terminal in:

```powershell
C:\xampp\htdocs\fixigo\frontend
```

Run:

```powershell
npm.cmd install
```

### 5. Verify API base URL

Make sure [frontend/src/services/api.js](/c:/xampp/htdocs/fixigo/frontend/src/services/api.js) uses:

```js
const API_BASE_URL = "http://localhost/fixigo/backend/api";
```

## Run Locally

### Backend

The backend will run through XAMPP Apache.

Example API URL:

```text
http://localhost/fixigo/backend/api/login.php
```

### Frontend

From:

```powershell
C:\xampp\htdocs\fixigo\frontend
```

Run:

```powershell
npx.cmd vite
```

Then open:

```text
http://localhost:5173
```

## Build Frontend

```powershell
cd C:\xampp\htdocs\fixigo\frontend
npm.cmd run build
```

## Notes

- The frontend currently uses `localhost` API URLs for local XAMPP testing.
- The backend uses PHP JSON APIs under `backend/api`.
- Some features depend on MySQL tables such as users, mechanics, bookings, vehicles, reviews, and notifications.

## Deployment

This project is also intended to run on AWS EC2 using a LEMP stack:

- Linux
- Nginx
- MySQL
- PHP

Frontend assets are built with Vite, and the PHP backend serves API endpoints connected to MySQL.

## Useful URLs

- App: `http://localhost:5173`
- phpMyAdmin: `http://localhost/phpmyadmin`
- Login API: `http://localhost/fixigo/backend/api/login.php`
- Mechanic Login API: `http://localhost/fixigo/backend/api/mechanic_login.php`
