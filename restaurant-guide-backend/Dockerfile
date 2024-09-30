# Use Node.js 18 as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose the backend port (e.g., 3000)
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "start"]
