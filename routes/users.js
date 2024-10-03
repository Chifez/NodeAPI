const router = require('express').Router();

router.get('/usertest', (req, res) => {
  res.send('user route is successful');
});

router.post('/userpost', (req, res) => {
  const name = req.body.name;
  console.log(name);
  res.send(`username is ${name}`);
});

module.exports = router;
