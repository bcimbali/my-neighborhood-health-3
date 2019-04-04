const express = require('express');

const router = express.Router();
const Post = require('./../../models/posts');

router.route('/').get(function(req, res) {
  Post.find(req.query).then(dbPost => res.json(dbPost));
});

router.route('/').post(function(req, res) {
  console.log(req);
  Post.create(req.body, function(error, user) {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

module.exports = router;
