# QuickBite

Welcome to the QuickBite a Food Ordering Platform, a comprehensive and fully responsive web application developed using the MERN stack. This platform allows users to explore and order from a variety of restaurants with ease. It leverages cutting-edge technologies to ensure a seamless and secure user experience.

Deployed URL-
[Qucikbite](https://quickbite-eyni.onrender.com)

## Technologies Used

- **Frontend**: ReactJs, Typescript, TailwindCSS, shadcn-ui
- **Backend**: ExpressJS, MongoDB
- **Authentication**: Auth0
- **Payments**: Stripe
- **Image Hosting**: Cloudinary

## Features

### 1. Restaurant Exploration

- **Search Functionality**: Users can search for restaurants by city, town, or restaurant name using the search bar.
- **Filtering Options**: Restaurants can be filtered by cuisine type.
- **Sorting Options**: Users can sort restaurants by delivery price, estimated delivery time, and more.
- **Pagination**: Efficient pagination ensures a smooth browsing experience.

### 2. User Authentication

- **Secure Sign-up and Login**: Users can securely sign up and log in using Auth0, ensuring robust authentication and data protection.

### 3. User Profile Management

- **Profile Page**: Users have a dedicated profile page where they can update their personal information.

### 4. Restaurant Management

- **Restaurant Listing**: Users can list their own restaurants by accessing the 'Manage Restaurant' section.
- **Menu and Pricing**: Restaurant owners can update their restaurant's menu and pricing information.

### 5. Restaurant Page

- **Menu Exploration**: Users can view detailed restaurant pages, explore menus, and see pricing.
- **Cart Functionality**: Items can be added to or removed from the cart.
- **Secure Checkout**: Users can securely checkout by filling in their details. Payments are processed securely via Stripe.
- **Live Order Status**: df

### 6. Order Status

- **Live Order Status**: Users can track their order status in real-time. Order status are polled in real time from the Database.

### 7. Order Management

- **Order Status Updates**: Restaurant owners can update the status of orders within the app, ensuring transparency and real-time communication.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parasd086/QuickBite
   ```
2. Navigate to the project directory:
   ```bash
   cd QuickBite
   ```
3. Install dependencies for the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Environment Variables

Create a `.env` file in `backend` directory and add the following environment variables:

```
AUTH0_AUDIENCE=your-auth0-audience
AUTH0_ISSUER_BASE_URL=your-auth0-base-url
MONGODB_CONNECTION_STRING=your-mongodb-uri
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
FRONTEND_URL=your-frontend-url
STRIPE_API_KEY=your-stripe-api-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

Create a `.env` file in `frontend` directory and add the following environment variables:

```
VITE_API_BASE_URL=your-backend-server-url
VITE_AUTH0_DOMAIN=your-auth0-frontend-project-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=your-webapp-callback-url
VITE_AUTH0_AUDIENCE=your-auth0-audience
```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### Access the Application

- App Frontend: `http://localhost:5173`
- App Backend: `http://localhost:3000`

---
