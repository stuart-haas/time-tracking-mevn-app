const Product = require('../models/product.model');

module.exports = {
  findAll: async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  },
  create: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json({ success: true, message: 'Product created', product });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();
      res.json({ success: true, message: 'Product updated', product });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      res.json({ success: true, message: 'Product deleted', product });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
};
