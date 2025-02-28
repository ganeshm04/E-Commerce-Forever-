# E-commerce App

This is a simple E-commerce application built with [Your Tech Stack].

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/e-commerce-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd e-commerce-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Explore the features of the E-commerce app.

## File Structure

```
e-commerce-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Product.js
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


# E-commerce Application

This project is an E-commerce application that consists of both frontend and backend components. The application allows users to browse products, add them to their cart, and proceed to checkout. It also includes an admin panel for managing products and orders.

## Project Structure

### Frontend
The frontend is built using React and includes the following key components:

- **Pages**: 
  - `Cart.jsx`: Displays the user's cart with the ability to update quantities and proceed to checkout.
  - `List.jsx`: Displays a list of products with the ability to remove products.
  - `Orders.jsx`: Displays a list of orders with the ability to update order status.

- **Components**:
  - `Title.jsx`: A reusable component for displaying titles.
  - `CartTotal.jsx`: Displays the total amount for the items in the cart.

- **Context**:
  - `ShopContext.js`: Provides global state management for the shop, including products, cart items, and user authentication.

- **Assets**:
  - Contains images and other static assets used in the application.

### Backend
The backend is built using Node.js and Express and includes the following key components:

- **Middleware**:
  - `adminAuth.js`: Middleware for authenticating admin users using JWT tokens.

- **Routes**:
  - `products.js`: Handles product-related API endpoints such as listing, adding, and removing products.
  - `order.js`: Handles order-related API endpoints such as listing and updating order status.

- **Controllers**:
  - Contains the logic for handling requests and interacting with the database.

## Key Features

- **User Authentication**: Users can log in and their sessions are managed using JWT tokens.
- **Product Management**: Admins can add, remove, and list products.
- **Order Management**: Admins can view and update the status of orders.
- **Cart Functionality**: Users can add products to their cart, update quantities, and proceed to checkout.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Axios, React Router, React Context API, React Toastify
- **Backend**: Node.js, Express, JWT, MongoDB ,stripe
- **Styling**: Tailwind CSS 

## Setup Instructions

1. **Clone the repository**:
   ```sh
   git clone <repository-url>

  ### Install Dependencies

  **For the frontend:**
  ```sh
  cd frontend
  npm install
  ```

  **For the backend:**
  ```sh
  cd backend
  npm install
  ```



## Setup Instructions (continued)

### Set up environment variables

Create a `.env` file in the `backend` directory with the following:

```
JWT_SECRET=<your-jwt-secret>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
```

### Run the application

**Start the backend server:**

```sh
cd backend
npm run server
```

**Start the frontend development server:**

```sh
cd frontend
npm run dev
```

**Start the admin panel:**

```sh
cd admin
npm run dev
```

### Access the application

Open your browser and navigate to:

- [http://localhost:5173](http://localhost:5173) for the frontend.
- [http://localhost:5174](http://localhost:5174) for the admin.

The backend server will be running on [http://localhost:4000](http://localhost:4000).
