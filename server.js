const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001; 

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/my-neighborhood-health');

//define middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}`);
})