const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' });
};

const getfeaturedProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  console.log(queryObject);

  //sorting feature
  let result = Product.find(queryObject);
  if (sort) {
    const sortedList = sort.split(',').join(' ');
    result = result.sort(sortedList);
  } else {
    result = result.sort('createdAt');
  }

  //search for certain fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  //pagination or limiting the results returned

  //await the result then send the response
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  getfeaturedProducts,
};
