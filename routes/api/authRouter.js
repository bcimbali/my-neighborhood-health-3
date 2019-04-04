const express = require('express');

const router = express.Router();
const User = require('./../../models/user');

// POST route for updating data. The / is using index.js which is /api/authentication
router.route('/register').post(function(req, res) {
  console.log(req);
  User.create(req.body, function(error, user) {
    if (error) {
      return res.sendStatus(500);
    }
    req.session.userId = user._id;
    return res.json({ redirect: '/' });
  });
});

router.route('/login').post(function(req, res, next) {
  User.authenticate(req.body.username, req.body.password, function(error, user) {
    if (error || !user) {
      const err = new Error('Wrong username or password.');
      err.status = 401;
      return next(err);
    }
    req.session.userId = user._id;
    return res.json({ redirect: '/' });
  });
});

// GET route after registering
router.get('/profile', function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    }
    if (user === null) {
      const err = new Error('Not authorized! Go back!');
      err.status = 400;
      return res.json({ error: err.status, authentication: false });
    }
    return res.json({
      username: user.username,
      id: user._id,
      email: user.email,
      authentication: true
    });
  });
});

// GET for logout logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ redirect: '/' });
    });
  }
});

module.exports = router;
