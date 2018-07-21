var express = require('express');
var router = express.Router();
var User = require('./../../models/user');


// GET route for reading data
// router.get('/login', function (req, res, next) {
//   return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
// });
console.log("in authRouter")

//POST route for updating data. The / is using index.js which is /api/authentication
router.route('/register').post (function(req, res){
  console.log(req);
  User.create(req.body, function (error, user) {
          if (error) {
            return res.sendStatus(500);
          } else {
            req.session.userId = user._id;
            console.log(user._id);
            //return res.sendStatus(200);
            return res.json({redirect: "/"})
          }
        });
});

router.route('/login').post (function(req, res, next){
  console.log("This is the login router req")
  console.log(req)
  console.log("In login router")
  User.authenticate(req.body.username, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong username or password.');
      err.status = 401;
      return next(err);
    } else {
      console.log("Correct username and password")
      req.session.userId = user._id;
      //return res.redirect('/');
      //return res.status(200);
      return res.json({redirect: "/"})
    }
  });
});

//GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;
          return res.json({error: err.status, authentication: false});
        } else {
          return res.json({username: user.username, id: user._id, email: user.email, authentication: true})
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  console.log(req.session);
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.json({redirect: "/"})
      }
    });
  }
});

module.exports = router;