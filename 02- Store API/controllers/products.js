const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' });
};

const getfeaturedProducts = async (req, res) => {
  const products = await Product.find(req.query);
  console.log(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  getfeaturedProducts,
};
