const router = require('express').Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
} = require('../controllers/order-controllers');
const Order = require('./models/order');
const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// create order
router.post('/', VerifyTokenAndAuthorization, createOrder);

// update order
router.put('/:id', VerifyTokenAndAuthorization, updateOrder);

// delete order
router.delete('/:id', VerifyTokenAndAuthorization, deleteOrder);

// get order
router.get('/:id', VerifyTokenAndAuthorization, getOrder);

// get all order
router.get('/', VerifyTokenAndAdmin, getAllOrder);

router.get('/income', VerifyTokenAndAdmin, getIncome);

module.exports = router;
