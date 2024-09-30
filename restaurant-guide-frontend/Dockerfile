# Build stage
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the frontend (React app)
RUN npm run build

# Production stage - Serve with Nginx
FROM nginx:alpine

# Copy the build files to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the Nginx port (e.g., 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
