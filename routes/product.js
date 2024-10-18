const router = require('express').Router();
const Product = require('../models/product');
const {
  VerifyTokenAndAdmin,
  VerifyTokenAndAuthorization,
} = require('./verifyToken');

// create a product
router.post('/', VerifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// update a product
router.post('/:id', VerifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// delete a product
router.delete('/:id', VerifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('The product has been deleted');
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// get all product
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json('An error occured');
  }
});

// get a product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});
module.exports = router;
