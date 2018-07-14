const router = require("express").Router();
const loginRouter = require("./loginRouter");
// const articleRoutes = require("./articles");
// const nytRoutes = require("./nyt");

// NYT routes - Imported from React hw
// router.use("/articles", articleRoutes);
// router.use("/nyt", nytRoutes);


router.use("/login", loginRouter);


module.exports = router;
