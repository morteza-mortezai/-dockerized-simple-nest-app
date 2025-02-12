# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]
