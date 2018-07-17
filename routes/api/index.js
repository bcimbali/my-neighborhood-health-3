const router = require("express").Router();
const authRouter = require("./authRouter");
// const articleRoutes = require("./articles");
// const nytRoutes = require("./nyt");

// NYT routes - Imported from React hw
// router.use("/articles", articleRoutes);
// router.use("/nyt", nytRoutes);


router.use("/authentication", authRouter);
// router.use("/login", loginRouter);

module.exports = router;
