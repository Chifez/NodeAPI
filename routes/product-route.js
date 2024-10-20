const router = require('express').Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getAProduct,
} = require('../controllers/product-controller');
const { VerifyTokenAndAdmin } = require('../middleware/verifyToken');

// create a product
router.post('/', VerifyTokenAndAdmin, createProduct);

// update a product
router.put('/:id', VerifyTokenAndAdmin, updateProduct);

// delete a product
router.delete('/:id', VerifyTokenAndAdmin, deleteProduct);

// get all product
router.get('/', getAllProduct);

// get a product
router.get('/:id', getAProduct);

module.exports = router;
