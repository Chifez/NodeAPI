const CryptoJS = require('crypto-js');
const User = require('../models/user');

// getUser controller
export const getUser = async (req, res) => {
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
    const { password, ...others } = updateUser;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(`An error occured ${err}`);
  }
};

//delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('user has been deleted');
  } catch (err) {
    res.status(500).json('an error occured');
  }
};

// get a user
export const getAUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json('an error occured');
  }
};

export const getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const allUser = query
      ? await User.find().sort({ _id: -1 }).limit(4).select('-password')
      : await User.find().select('-password');
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(`an error occured ${err}`);
  }
};

export const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(`an error occured, ${err}`);
  }
};
