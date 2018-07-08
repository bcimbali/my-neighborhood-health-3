const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require('mongoose');
const favicon = require('express-favicon');
const PORT = process.env.PORT || 3001; 

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/my-neighborhood-health');

//define middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Heroku will use this for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view.
app.use(routes);

//start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}`);
})