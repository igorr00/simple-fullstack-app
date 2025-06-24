# Simple Fullstack App

A fullstack web application for an online store where:
- Admins can add, edit, and manage products and users.
- Customers can browse products.

Built with:
- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Containerized with**: Docker + Docker Compose

---

## Project Structure

/simple-fullstack-app  
├── backend/ # Express server + Sequelize + API routes  
├── frontend/ # React app for UI  
└── docker-compose.yml  

---

## Features

### Authentication
- Login/logout for Admins and Customers

### Customer Side
- Browse products
- View product details
- View/edit profile

### Admin Panel
- Add/edit/delete products
- Manage users (CRUD)
- View/edit profile

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [PostgreSQL](https://www.postgresql.org/)

---

## Local Development (without Docker)

1. **Clone the repo**  
```bash
git clone https://github.com/igorr00/simple-fullstack-app.git
cd simple-fullstack-app
Backend setup

```bash
cd backend
npm install
```
Create a .env file:

```env
DB_NAME=simple-fullstack-app
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
PORT=5000
```

Run migrations and seeds:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Start the backend:
```bash
npm start
```

Frontend setup
```bash
cd ../frontend
npm install
npm start
React runs at http://localhost:3000.
```

Running with Docker

Make sure your .env in /backend contains:

```env
DB_NAME=simple-fullstack-app
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=db
DB_PORT=5432
PORT=5000
```

Run the app:
```bash
docker compose up --build
```

This starts:  
Backend on: http://localhost:5000  
Frontend on: http://localhost:3000  
PostgreSQL database
