const router = require("express").Router();
const authRouter = require("./authRouter");
const articleRouter = require("./articleRouter");

router.use("/authentication", authRouter);
// router.use("/login", loginRouter);

router.use("/news", articleRouter);

module.exports = router;
