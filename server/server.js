require('dotenv').config();
var express = require('express');
var mongooose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var path = require('path');
var Post = require('./models/post');
var postsRouter = require('./routes/postsRouter');
var app = express();
var port = process.env.PORT || 8080;
var testingDatabase = 'black-techy-v2-DB';
mongooose.connect("mongodb://localhost:27017/" + testingDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    return err ? console.log(err) : console.log("Connected to " + testingDatabase);
}
// Checks if the database has successfully connected.
);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postsRouter);
app.listen(port, function () { return console.log("Server running on port: " + port); });
