const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes');

// Load in environment variables
require('dotenv').load();

const db = mongoose.connection;

/** Connect to Mongoose and use new URL parser */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/my-neighborhood-health', {
  useNewUrlParser: true
});

// use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// define middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Heroku will use this for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// serve static files from template
app.use(express.static(`${__dirname}/templateLogReg`));

// Add routes, both API and view.
app.use(routes);

// start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}`);
});
