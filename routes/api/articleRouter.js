const router = require("express").Router();
const articleController = require("../../controllers/articleController");

console.log("we are in the article router");

router.route("/").get(articleController.getArticles);

module.exports = router;