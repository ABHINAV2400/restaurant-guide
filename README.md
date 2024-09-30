# Restaurant Guide Application

## Overview

The **Restaurant Guide** is a single-page application introducing users to various restaurants, ideal for tourism centers. The project uses a tech stack of **TypeScript, React, Fastify**, and the **Google Places API**, which acts as a backend "database."

## Features:

- **Frontend**: A user-friendly interface displaying an overview of restaurants and a detailed card upon selection.

- **Backend**: Structured routes to interact with the Google Places API.

- **Routes**: Fetch all restaurants or fetch a specific restaurant.

- **Map Integration**: Displays restaurant locations on a map.

- **Filters**: Allows filtering by rating criteria. As the filter is applied, the map dynamically updates to display markers indicating the locations of the filtered restaurants, ensuring a seamless and interactive experience.

- **Containerization with Docker and Docker Compose**: Seamlessly integrates both frontend and backend.

## Technologies Used

- **Backend**: Fastify (Node.js), TypeScript

- **Frontend**: React, TypeScript

- **Google Places API**

- **Google Maps API**

- **Languages**: TypeScript (both backend and frontend)

## Environment Variables

### Backend (`restaurant-guide-backend/.env`):

```

PORT=4000

GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY

DEFAULT_LOCATION=59.3251,18.0703

DEFAULT_RADIUS=3000

CORS_ORIGIN=http://localhost:3000

```

### Frontend (`restaurant-guide-frontend/.env`):

```

REACT_APP_API_BASE_URL=http://localhost:4000/api

REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

```

## How to Run Locally

### Prerequisites

- **Node.js** (v18+)

- **npm**

### Steps:

1\. **Clone the repository**:

   ```sh

   git clone https://github.com/ABHINAV2400/restaurant-guide

   cd restaurant-guide

   ```

2\. **Backend Setup**:

   - Navigate to the backend directory:

     ```sh

     cd restaurant-guide-backend

     npm install

     ```

   - Create a `.env` file in `restaurant-guide-backend` with the required environment variables.

   - Run the backend:

     ```sh

     npm run build

     npm start

     ```

3\. **Frontend Setup**:

   - Navigate to the frontend directory:

     ```sh

     cd ../restaurant-guide-frontend

     npm install

     ```

   - Create a `.env` file in `restaurant-guide-frontend` with the required environment variables.

   - Run the frontend:

     ```sh

     npm start

     ```

4\. **Access the Application**:

   - **Frontend**: `http://localhost:3000`

   - **Backend**: `http://localhost:4000`

## Running with Docker

### Steps:

1\. **Ensure Docker is installed**.

2\. **Run the Docker Compose**:

   The Docker images are already available in Docker Hub, so you don't need to build them.

   ```sh

   docker-compose up

   ```

3\. **Access the Application**:

   - Frontend: `http://localhost`

   - Backend: `http://localhost:4000`

### Environment Variables for Docker:

Create an `.env` file in the root of the `restaurant-guide-backend` directory with:

```sh

PORT=4000

GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY

DEFAULT_LOCATION=59.3251,18.0703

DEFAULT_RADIUS=3000

CORS_ORIGIN=http://localhost

```

By following these steps, you'll have the application running locally or using Docker with minimal setup.


