const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
require('dotenv').config();

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
