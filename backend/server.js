const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
require('dotenv').config();
const path = require('path');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const cors = require('cors');
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
