"use strict";
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var path = require('path');
var Post = require('./models/post');
var postsRouter = require('./routes/postsRouter');
var app = express();
var port = process.env.PORT || 8080;
var DB_URL = process.env.MONGODB_CLOUD_URI ||
    "mongodb://localhost:27017/black-techy-v2-DB";
mongoose.connect(DB_URL, //Connects to mongodb cloud database or local database.
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) { return (err ? console.log(err) : DB_URL === 'mongodb://localhost:27017/black-techy-v2-DB' ? console.log('Connected to development database') : console.log('Connected to production database.')); }
// Checks if the database has successfully connected.
);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postsRouter);
if (process.env.NODE_ENV === 'production') {
    // Accesses application files from build upon deployment.
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
    });
}
app.listen(port, function () { return console.log("Server running on port: " + port); });
