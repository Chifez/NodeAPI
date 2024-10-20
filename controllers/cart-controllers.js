const Cart = require('./models/cart');

// create cart
export const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json('An error occured');
  }
};

// update cart
export const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
};

// delete cart
export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted');
  } catch (err) {
    res.status(500).json('An error occurred');
  }
};

// get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
};

// get all cart
export const getAllCart = async (req, res) => {
  const query = req.query.new;
  try {
    const allCart = query
      ? await Cart.find().sort({ createdAt: -1 }).limit(4)
      : await Cart.find().limit(4);
    res.status(200).json(allCart);
  } catch (err) {
    res.status(500).json('An error occured');
  }
};
