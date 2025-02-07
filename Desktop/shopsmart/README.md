# ShopSmart

## Overview of the Application

ShopSmart is a modern e-commerce application built with Next.js that offers a seamless shopping experience. Users can browse products, view detailed information, manage their shopping cart, and enjoy a responsive, user-friendly interface powered by server-side rendering capabilities.

---

## Features Implemented

- **Product Listing**:
  - Browse through a comprehensive catalog of products
  - View product images, descriptions, and prices
  - Server-side rendering for optimal performance and SEO

- **Product Detail Page**:
  - Detailed product information with images and descriptions
  - Add products to cart functionality
  - Dynamic routing with Next.js

- **Shopping Cart**:
  - View and manage cart items
  - Update quantities and remove items
  - Calculate total price with shipping
  - Persistent cart state using Zustand

- **Authentication**:
  - Secure user authentication
  - Protected routes for authenticated users
  - User session management

- **Theme Support**:
  - Light and dark mode support
  - Seamless theme switching
  - Persistent theme preference

- **Responsive Design**:
  - Mobile-first approach
  - Tailwind CSS for responsive styling
  - Optimized for all device sizes

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/revou-fsse-oct24/milestone-2-Rifqi-16.git
   ```

2. Navigate to the project directory:
   ```bash
   cd milestone-2-Rifqi-16/shopsmart
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Start the production server:
   ```bash
   npm start
   ```

---

## Testing

The application uses a comprehensive testing suite:

- Jest for unit testing
- React Testing Library for component testing
- Integration tests for critical features

To run tests:

1. Run all tests:
   ```bash
   npm test
   ```

2. For coverage report:
   ```bash
   npm test -- --coverage
   ```

---

## Technologies Used

- **Next.js 15.1.6**: Server-side rendering and routing
- **React 19.0.0**: UI components and state management
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive styling
- **Zustand**: State management
- **Next-themes**: Theme management
- **Jest & React Testing Library**: Testing framework
- **Headless UI**: Accessible component primitives
- **Heroicons**: Beautiful icons
- **Next-auth**: Authentication
- **API**: Data fetched from `https://api.escuelajs.co/api/v1/`

---

## Features

- Product browsing and searching
- Detailed product views
- Shopping cart management
- User authentication
- Theme switching
- Responsive design
- Comprehensive test coverage

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in development mode.
