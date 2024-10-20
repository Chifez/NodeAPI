const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require('../middleware/verifyToken');

const router = require('express').Router();

const {
  getUser,
  deleteUser,
  getAUser,
  getAllUser,
  getUserStats,
} = require('../controllers/user-controllers');

router.put('/:id', VerifyTokenAndAuthorization, getUser);

router.delete('/:id', VerifyTokenAndAuthorization, deleteUser);

router.get('/find/:id', VerifyTokenAndAdmin, getAUser);

router.get('/', VerifyTokenAndAdmin, getAllUser);

router.get('/stats', VerifyTokenAndAdmin, getUserStats);

module.exports = router;
