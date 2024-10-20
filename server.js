const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user-routes');
const authRoute = require('./routes/auth-routes');
const productRoute = require('./routes/product-route');
const cartRoute = require('./routes/cart-routes');
const orderRoute = require('./routes/order-routes');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('db connection succesful'))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is running');
});
