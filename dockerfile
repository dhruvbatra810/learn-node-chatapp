# Use the official Node.js image with specified version as base image
FROM --platform=linux/amd64 node:18.0.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app using npm
CMD ["npm", "start"]
