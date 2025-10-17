# 🌞 Solar Website Frontend — Vishal Pal

## 🧭 Overview
This is the **frontend** of the Solar Website developed as part of the **NewRa Grids Technical Task**.  
The project demonstrates **clean UI/UX**, **interactive features**, and **secure backend integration** using **JWT authentication (cookies)**.  

It includes a **Solar Calculator** and a **Solar Irradiance Map**, enabling users to estimate solar energy potential and explore sunlight data visually.

**🔗 Live URL:** [https://newra-grids-solar.vercel.app/](https://newra-grids-solar.vercel.app/)

---

## ⚙️ Tech Stack
- **React.js (Vite)** – Component-based frontend library  
- **Tailwind CSS** – Modern utility-first styling  
- **Redux Toolkit & RTK Query** – State management and API integration  
- **Axios** – For API requests (where required)  
- **React Router DOM** – Client-side routing  
- **Framer Motion** – Smooth animations and transitions  
- **JWT + HTTP-only Cookies** – Secure authentication  

---

## 💡 Features
✅ **Public Pages**
- **Home Page:** Overview of solar energy and project purpose  
- **About Page:** Company info and vision  
- **Solar Calculator:**  
  - Takes user inputs (usage, sunlight hours, tariff, system efficiency, etc.)  
  - Calculates recommended solar system capacity, estimated cost, and savings  
  - Visualized with Recharts (bar/line charts)
- **Solar Irradiance Map:**  
  - Displays sunlight data on an interactive map  
  - Allows users to explore solar potential visually  
- **Contact Form:**  
  - Submits inquiries directly to backend  
  - Data stored securely in MongoDB  

✅ **Admin Panel**
- **Login / Logout** – Secure with JWT (HTTP-only cookies)  
- **Contact Submissions Table** – Lists all contact form submissions (fetched using RTK Query)  
- **Protected Route** – Accessible only to authenticated admin users  

✅ **UI/UX**
- Fully responsive across all devices  
- Tailwind-based design with dark mode support  
- Smooth animations and hover effects  
- Clean typography and spacing for readability  

---

## 🧠 State & Data Flow
- **Redux Toolkit** manages global state.  
- **RTK Query** handles API requests efficiently (for fetching contacts, login, etc.).  
- Auth token is automatically included via cookie — no manual header management needed.  
- Error states and loading indicators are handled gracefully.

