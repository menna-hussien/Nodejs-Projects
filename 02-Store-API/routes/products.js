const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
  getfeaturedProducts,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
router.route('/featured').get(getfeaturedProducts);

module.exports = router;
