const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
require('dotenv').config();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

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
