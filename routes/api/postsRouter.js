var express = require("express");
var router = express.Router();
var Post = require("./../../models/posts");

console.log("in postsRouter");

router.route("/").get(function(req, res) {
  Post.find(req.query).then(dbPost => res.json(dbPost));
});

router.route("/").post(function(req, res) {
  console.log(req);
  Post.create(req.body, function(error, user) {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    } else {
      return res.sendStatus(200);
    }
  });
});

module.exports = router;
