const db = require("../models")

module.exports = {
    findAll: function(req, res) {
        console.log("in the find all")
        res.json({name: "karen"})
      },
      //  create: function(req, res) {
      //   const posts = {
         
      //     post: req.body.post,
      //     username: req.body.username,
      //     date: req.body.email
      //   };
    
      //   db.Posts
      //     .create(posts)
      //     .then(dbPosts => res.json(dbPosts))
      //     .catch(err => res.status(422).json(err));
      // },
}
