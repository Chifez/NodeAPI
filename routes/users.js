const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/user');

//UPDATE
router.put('/:id', VerifyTokenAndAuthorization, async (req, res) => {
  if (req.user.password) {
    req.user.password = CryptoJS.AES.encrypt(
      req.user.password,
      process.env.SEC_KEY
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(`An error occured ${err}`);
  }
});

//Delete

router.delete('/:id', VerifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('user has been deleted');
  } catch (err) {
    res.status(500).json('an error occured');
  }
});

// get user
router.get('/find/:id', VerifyTokenAndAdmin, async (req, res) => {
  try {
    const foundUser = User.findById(req.params.id);
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json('an error occured');
  }
});
module.exports = router;
