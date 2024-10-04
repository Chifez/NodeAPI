const JWT = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    JWT.verify(token, process.env.SEC_KEY, (err, user) => {
      if (err) {
        res.status(403).json('token is not valid');
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('you are not authentcated');
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('you are not allowed to do that');
    }
  });
};
module.exports = { VerifyToken, VerifyTokenAndAuthorization };
