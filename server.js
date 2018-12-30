const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const favicon = require("express-favicon");
const PORT = process.env.PORT || 3001;
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

// Load in environment variables
require("dotenv").load();

var db = mongoose.connection;

//connect to mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/my-neighborhood-health"
);

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

//define middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Heroku will use this for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// serve static files from template
app.use(express.static(__dirname + "/templateLogReg"));

// Add routes, both API and view.
app.use(routes);

//start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}`);
});
