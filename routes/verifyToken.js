const JWT = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.SEC_KEY, (err, user) => {
      if (err) {
        res.status(403).json('token is not valid');
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('you are not authenticated');
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      console.log('user details', req.user.id, req.params.id, req);
      res.status(403).json('you are not allowed to do that');
    }
  });
};

const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('you are not authorized to do that');
    }
  });
};
module.exports = {
  VerifyToken,
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
};
