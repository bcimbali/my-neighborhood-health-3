const router = require('express').Router();
const articleController = require('../../controllers/articleController');

router.route('/').get(articleController.getArticles);

module.exports = router;
