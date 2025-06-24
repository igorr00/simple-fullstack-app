FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]