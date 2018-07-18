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
            return res.sendStatus(200);
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
      return res.redirect('/');
    }
  });
});












  //confirm that user typed same password twice
//   if (req.body.password !== req.body.passwordConf) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     res.send("passwords dont match");
//     console.log('passwords dont match');
//     return next(err);
//   }

//   if (req.body.email &&
//     req.body.username &&
//     req.body.password) {

//     var userData = {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     }

//     User.create(userData, function (error, user) {
//       if (error) {
//         return res.sendStatus(500);
//       } else {
//         req.session.userId = user._id;
//         return res.sendStatus(200);
//       }
//     });

//   } else if (req.body.email && req.body.password) {
//     User.authenticate(req.body.email, req.body.password, function (error, user) {
//       if (error || !user) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//   } else {
//     var err = new Error('All fields required.');
//     err.status = 400;
//     console.log("all fields are necessary");
//     return next(err);
//   }
// })

// GET route after registering
// router.get('/profile', function (req, res, next) {
//   User.findById(req.session.userId)
//     .exec(function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!');
//           err.status = 400;
//           return next(err);
//         } else {
//           return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//         }
//       }
//     });
// });

// // GET for logout logout
// router.get('/logout', function (req, res, next) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function (err) {
//       if (err) {
//         return next(err);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   }
// });

module.exports = router;