const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
    const accessToken = JWT.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.SEC_KEY,
      { expiresIn: '3d' }
    );

    return res.status(200).json({ ...other, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
