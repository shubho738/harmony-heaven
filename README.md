# HarmonyHeaven

This project is an ecommerce store for musical instruments. It features the standard functionalities of an ecommerce store. It is built using Next.js 13 App Router, React Server Components, NextAuth, TypeScript, Tailwind, Redux Toolkit, SWR, and follows a full-stack architecture with Prisma and MongoDB for data storage.

## Features

### Full Stack Development
- **Frontend:** Built with Next.js 13 App router and React Server Components, for efficient server-side rendering and data fetching.
- **Backend:** Utilizes Next.js API routes as the backend, providing a simple and integrated way to handle API requests and responses. Uses Prisma as the ORM to interact with the MongoDB database.

### Authentication
- **NextAuth:** Authentication is implemented using NextAuth.

### Responsive Design
- **Mobile-First Approach:** Designed to be responsive from the ground up, ensuring a seamless experience across devices of all sizes.

### Performance Optimization

- **Fast and Responsive:** Leverages React Server Components for server-side data fetching, ensuring fast and responsive performance. The React code is optimized for performance.


### React Component-Based Architecture
- **Reusable Components:** Components are designed to be modular and reusable, promoting a consistent look and feel throughout the application. Effort has been dedicated to make the UI as reusable as possible.

### Custom Hooks
- **Reusable Logic:** Utilizes custom hooks for encapsulating and reusing logic across components, promoting code reusability and maintainability.

### Global State Management with Redux
- **Centralized State:** Uses Redux Toolkit to manage global application state, ensuring that data is consistent across all components.

### Data Fetching
- Various methods of data fetching are used, including server-side data fetching mainly, recommended to use with Next.js 13 App router, and client-side data fetching with SWR.

### Pagination
- **Efficient Data Loading:** Pagination is implemented to load large sets of data efficiently.

### Payment Processing
- **Stripe:** Utilizes Stripe for payment processing.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.


## Environment Variables

The following environment variables need to be set for the application to work properly:

- `DATABASE_URL`: MongoDB connection string.
- `NEXT_PUBLIC_API_URL`: URL of the API.
- `NEXT_PUBLIC_FRONTEND_URL`: URL of the frontend.
- `STRIPE_API_KEY`: Stripe API key.
- `NEXTAUTH_SECRET`: Secure random string for NextAuth.
- `NEXTAUTH_JWT_SECRET`: Secure random string for JWT.

Create a `.env.local` file at the root of the project and set these variables accordingly.
