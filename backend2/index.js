const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// connect to mongoose
mongoose.connect(config.db);

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
// Put all API endpoints under '/api'
app.use('/my_files', require('./file'));

const port = process.env.PORT || 3001;
var server = app.listen(port);

console.log(`GridFS tutorial listening on ${port}`);

module.exports = server;
