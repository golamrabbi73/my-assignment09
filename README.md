# 🚗 DriveFleet — Car Rental Platform

**Live Site URL:** [https://my-assignment09.vercel.app](https://my-assignment09.vercel.app)

DriveFleet is a full-stack car rental platform where users can explore available cars, view detailed listings, book vehicles, manage their bookings, and list their own cars for rent. Built with a focus on secure authentication, smooth user experience, and a clean, recruiter-friendly design.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password and Google login powered by Firebase, with JWT stored in HTTPOnly cookies for protected API access.
- 🚘 **Browse & Search Cars** — Explore all available cars with real-time search by car name and filtering by car type.
- 📅 **Easy Booking System** — Book any available car in a few clicks, with options for driver assistance and special requests.
- 🛠️ **Manage Your Listings** — Add, update, and delete your own car listings with full control over pricing, availability, and details.
- 📋 **Personal Dashboard** — Track all your bookings and added cars in dedicated, easy-to-navigate pages.
- 📱 **Fully Responsive** — Optimized layout and experience across mobile, tablet, and desktop devices.
- 🌗 **Light/Dark Theme Toggle** — Switch between light and dark mode for a comfortable browsing experience.
- ⚡ **Smooth Animations** — Page transitions and UI interactions powered by Framer Motion.

---

## 🛠️ Tech Stack

**Client:**
- React + Vite
- Tailwind CSS + DaisyUI
- React Router
- Firebase Authentication
- Axios
- Framer Motion
- SweetAlert2 & React Hot Toast

**Server:**
- Node.js + Express
- MongoDB (Native Driver)
- JWT (JSON Web Token)
- Cookie-based authentication

---

## 📂 Related Repositories

- **Client Repository:** [https://github.com/golamrabbi73/my-assignment09](https://github.com/golamrabbi73/my-assignment09)
- **Server Repository:** [https://github.com/golamrabbi73/my-assignment09-server](https://github.com/golamrabbi73/my-assignment09-server)
- **Server Live URL:** [https://my-assignment09-server.onrender.com](https://my-assignment09-server.onrender.com)

---

## 🚀 Getting Started Locally

```bash
# clone the repository
git clone https://github.com/golamrabbi73/my-assignment09

# navigate into the project
cd my-assignment09

# install dependencies
npm install

# create a .env file with your Firebase config and API URL
# (see .env.example or required variables below)

# run the development server
npm run dev
```

### Required Environment Variables

```
VITE_APIKEY=
VITE_AUTHDOMAIN=
VITE_PROJECTID=
VITE_STORAGEBUCKET=
VITE_MESSAGINGSENDERID=
VITE_APPID=
VITE_MEASUREMENTID=
VITE_API_URL=
```

---

## 👤 Author

Built as part of a full-stack web development assignment — DriveFleet Car Rental Platform.