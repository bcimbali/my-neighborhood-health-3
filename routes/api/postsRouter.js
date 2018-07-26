var express = require('express');
var router = express.Router();
var Post = require('./../../models/posts');
// const postsController = ('./../../controllers/postsController.js');

console.log("in postsRouter")

router.route('/').get (function(req, res){
  // console.log(req);
  Post.find(req.query)
  .then(dbPost => res.json(dbPost)) 
        
});

router.route('/').post (function(req, res){
  console.log(req);
  Post.create(req.body, function (error, user) {
          if (error) {
            console.log(error);
            return res.sendStatus(500);
          } else {
            // req.session.userId = user._id;
            // console.log(user._id);
            return res.sendStatus(200);
            //return res.json({redirect: "/"})
          }
        });
});


// router.post('/', function (req, res){
//   console.log("This is the req.body");  
//   console.log(req.body);
//     const posts = {
         
//             post: req.body.newBodyPost,
//             username: req.body.username,
//             email: req.body.email
//           };
//       console.log(posts)
//           // Posts
//           //   .create(posts)
//           //   .then(posts => res.json(posts))
//           //   .catch(err => res.status(422).json(err));

//           Post.create(posts, function (error, user) {
//             console.log("we are in post.create")
//             if (error) {
//               return res.sendStatus(500);
//             } else {
//               //req.session.userId = user._id;
//               //console.log(user._id);
//               return res.sendStatus(200);
//               //return res.json()
//             }
//           });  
//         });
          
    

 // .get(postsController.findAll, console.log("in get route"))
 //.post(postsController.create);

module.exports = router;

