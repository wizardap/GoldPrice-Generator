FROM node:23-slim 


# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/index.js"]