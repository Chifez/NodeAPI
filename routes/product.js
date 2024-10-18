const router = require('express').Router();
const Product = require('../models/product');
const { VerifyTokenAndAdmin } = require('./verifyToken');

//   Create

router.post('/', VerifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// update
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

// delete

router.delete('/:id', VerifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('The product has been deleted');
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});
module.exports = router;
