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
var localDB_URL = "mongodb://localhost:27017/black-techy-v2-DB";
mongoose.connect(process.env.MONGODB_CLOUD_URI, //Connects to mongodb cloud database.
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    return err ? console.log(err) : console.log('Connected to remote database');
}
// Checks if the database has successfully connected.
);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postsRouter);
if (process.env.NODE_ENV === 'production') {
    //Builds application upon deployment.
    app.use(express.static('client/build/'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, function () { return console.log("Server running on port: " + port); });
