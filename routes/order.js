const router = require('express').Router();
const Order = require('./models/order');
const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require('./verifyToken');

// create order
router.post('/', VerifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json('An error occcured');
  }
});

// update order
router.put('/:id', VerifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedOrder = await cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// delete order
router.delete('/:id', VerifyTokenAndAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order deleted successfully');
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// get order
router.get('/:id', VerifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

// get all order
router.get('/', VerifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json('An error occurred');
  }
});

router.get('/income', VerifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    date.setMonth(date.getMonth(lastMonth.getMonth() - 1))
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonth,
          },
        },
      },
      {
        $project: {
          month: {
            $month: '$createdAt',
          },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          amount: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json('An error occured');
  }
});

module.exports = router;
