const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' });
};

const getfeaturedProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, numericFilters } =
    req.query;
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

  //numericFilters
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
      console.log(queryObject);
    });
  }
  console.log(queryObject);

  //filter the results
  let result = Product.find(queryObject);

  //sorting feature
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

  const pageNumber = Number(page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (pageNumber - 1) * limit;

  result = result.skip(skip).limit(limit);

  //await the result then send the response
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  getfeaturedProducts,
};
