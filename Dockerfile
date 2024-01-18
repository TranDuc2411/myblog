# Use an official Node.js runtime as a parent image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 7777

# Define the command to run the application
CMD ["npm", "start"]
