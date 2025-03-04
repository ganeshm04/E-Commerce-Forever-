# E-Commerce Platform

A full-stack e-commerce application with admin dashboard, user authentication, payment integration, and product management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Features
- User Authentication & Authorization
- Product Management
- Shopping Cart Functionality  
- Order Processing
- Payment Integration (Stripe & Razorpay)
- Admin Dashboard
- Responsive Design

## Tech Stack
### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Payment Gateways
- Stripe
- Razorpay

## Project Structure

project/

- ├── frontend/ # Customer website 
- ├── admin/ # Admin dashboard
- └── backend/ # API server
- frontend/
- ├── src/
- │ ├── components/ # Reusable UI components
- │ ├── pages/ # Page components
- │ ├── context/ # React context
- │ ├── utils/ # Utility functions
- │ ├── App.jsx # Main entry point
- │ ├── index.html # HTML template
- │ ├── main.jsx # React entry point
- │ ├── vite-env.d.ts # TypeScript configuration
- │ ├── .env # Environment variables
- │ ├── .gitignore # Git ignore file
- │ ├── package.json # Project dependencies
- │ ├── README.md # Project documentation
- │ └── tailwind.config.js # Tailwind CSS configuration

- 
- admin/
- ├── src/
- │ ├── components/ # Admin UI components
- │ ├── pages/ # Admin pages
- │ └── App.jsx # Admin application component
-
- backend/
- ├── src/
- │ ├── controllers/ # API controllers
- │ ├── models/ # MongoDB models
- │ ├── routes/ # API routes
- │ ├── utils/ # Utility functions
- │ ├── app.js # Express application
- │ ├── .env # Environment variables
- │ ├── .gitignore # Git ignore file
- │ ├── package.json # Project dependencies
- │ ├── README.md # Project documentation
- │ └── server.js # Server entry point


## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- Cloudinary account
- Stripe/Razorpay account (for payments)

### Environment Variables

Create `.env` files in each directory:

#### Backend (.env)

- PORT=4000
- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_NAME=your_cloudinary_name
- CLOUDINARY_API_KEY=your_cloudinary_key
- CLOUDINARY_SECRET_KEY=your_cloudinary_secret
- STRIPE_SECRET_KEY=your_stripe_key
- ADMIN_EMAIL=admin@example.com
- ADMIN_PASSWORD=admin_password


#### Frontend & Admin (.env)
VITE_BACKEND_URL=http://localhost:4000


### Installation Steps

1. Clone the repository

- bash
- git clone <repository-url>

2. Install Backend Dependencies

- bash
- cd backend
- npm install

3. Install Frontend Dependencies

- bash
- cd frontend
- npm install


4. Install Admin Dependencies

- bash
- cd admin
- npm install




4. Start the Development Servers

- bash
- npm run dev



### Running the Application

1. Start Backend Server

- bash
- cd backend
- npm run server


2. Start Frontend Development Server

- bash
- cd frontend
- npm run dev


3. Start Admin Development Server

- bash
- cd admin
- npm run dev



The applications will be available at:
- Frontend: http://localhost:5173
- Admin Panel: http://localhost:5174
- Backend API: http://localhost:4000

## API Endpoints

### User Routes
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- POST /api/users/admin - Admin login

### Product Routes
- GET /api/products/list - Get all products
- POST /api/products/add - Add new product (Admin)
- GET /api/products/:id - Get single product

### Order Routes
- POST /api/orders/place - Place new order
- GET /api/orders/list - Get all orders (Admin)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
