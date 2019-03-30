const router = require('express').Router();
const authRouter = require('./authRouter');
const articleRouter = require('./articleRouter');
const postsRouter = require('./postsRouter');

router.use('/authentication', authRouter);
// router.use("/login", loginRouter);

router.use('/news', articleRouter);
router.use('/posts', postsRouter);

module.exports = router;
