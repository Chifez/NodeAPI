const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
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
app.listen(process.env.PORT || 5000, () => {
  console.log('server is running');
});
