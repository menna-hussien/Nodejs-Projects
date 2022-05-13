require('dotenv').config();
const products = require('./routes/products');
//async errors
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddle = require('./middleware/error-handler');

//db
const connectDB = require('./db/connect');
//middle
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

//product routes
app.use('/api/v1/products', products);

//use the errors
app.use(notFoundMiddleware);
app.use(errorMiddle);

//
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
