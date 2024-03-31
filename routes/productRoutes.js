const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add new product
// Add new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save(); // Save the product and get the saved document
    res.status(201).json(savedProduct); // Send back the entire saved document
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    // console.log("hereee");
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by ID
router.get('/id/:id', getProduct, (req, res) => {
  res.json(res.product);
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

// Route to search for products based on query parameters
router.get('/search', async (req, res) => {
  try {
    const { name, size, color, material } = req.query;

    // Construct query object based on provided query parameters
    const query = {};
    if (name) query.name = name;
    if (size) query.size = size;
    if (color) query.color = color;
    if (material) query.material = material;

    // Find products that match the query
    const filteredProducts = await Product.find(query);

    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
