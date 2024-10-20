const router = require('express').Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
} = require('../controllers/cart-controllers');
const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// create cart
router.post('/', VerifyTokenAndAuthorization, createCart);

// update cart
router.put('/:id', VerifyTokenAndAuthorization, updateCart);

// delete cart
router.delete('/:id', VerifyTokenAndAuthorization, deleteCart);

// get cart
router.get('/:id', VerifyTokenAndAuthorization, getCart);

// get all cart
router.get('/', VerifyTokenAndAdmin, getAllCart);

module.exports = router;
