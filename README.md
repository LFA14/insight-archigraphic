# Insight Archigraphic - Frontend

This is the frontend application for **Insight Archigraphic**, a custom business management system used to manage stock, products, employees, and shop information. It is built with **React** and communicates with a **NestJS** backend via REST APIs.

## 🌐 Live Preview

Local Development: `http://localhost:5173`

---

## 📁 Project Structure

```
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components (e.g., Navbar, Footer)
│   ├── pages/             # Page views (e.g., Dashboard, EditStock AddProduct)
│   ├── App.jsx            # Main App component with routing
│   ├── index.jsx          # React root entry point
│   └── index.css          # Global styles
```

---

## 🚀 Features

- ✅ View and edit stock details
- ✅ Add and manage products (with image uploads)
- ✅ Employee role & salary management
- ✅ Shop information overview
- ✅ React Router-based navigation
- ✅ Responsive UI with Bootstrap

---

## 🛠️ Tech Stack

- **React** with Vite
- **React Router DOM**
- **Axios** for API requests
- **Bootstrap** for styling
- **NestJS** (backend API)
- **Multer** (for image uploads)

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/LFA14/insight-archigraphic-frontend.git
cd insight-archigraphic-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm run dev
```

The app will start on `http://localhost:5173`

---

## 📡 API Endpoints (example)

Make sure your backend (NestJS) is running at `http://localhost:3001`

- `GET /stock/:id`
- `PATCH /stocks/:id`
- `POST /products`
- `GET /products`
- `GET /employees`

> For image uploads, make sure the backend accepts `multipart/form-data`.

---

## 📷 Image Upload Instructions

When adding a product, you must:
- Use a `<form>` with `enctype="multipart/form-data"`
- Include the image in a `FormData` object
- Backend will save it under `/public/uploads`

---

## 🧑‍💻 Developed By

**Yasser Abdelhadi**  

---

## 📜 License

This project is for academic purposes and internal use only. Please contact the developer for reuse or deployment.
