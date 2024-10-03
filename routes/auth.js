const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');

// REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), // Make sure to convert to string
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err); // Send error response to the client
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('user not found');
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const mainPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (mainPassword !== req.body.password) {
      console.log('main', mainPassword, 'input', req.body.password);
      return res.status(401).json('wrong credentials');
    }

    const { password, ...other } = user._doc;
    return res.status(200).json(other); // Send success response with user data excluding password
  } catch (err) {
    console.log(err);
    res.status(500).json(err); // Send error response to the client
  }
});

module.exports = router;