const { Product } = require('../models');

exports.createProduct = async (req, res) => {
    try {
      const { name, price, category, picture } = req.body;
      const product = await Product.create({
        name,
        price,
        category,
        picture
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, { where: { id } });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            return res.json(updatedProduct);
        }
        res.status(404).json({ error: 'Product not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id } });
        if (deleted) return res.json({ message: 'Product deleted' });
        res.status(404).json({ error: 'Product not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};