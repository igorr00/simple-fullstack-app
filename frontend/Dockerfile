FROM node:18

# Set working directory
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]