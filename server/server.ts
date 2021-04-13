const express = require('express');
const mongooose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Post = require('./models/post');
const postsRouter = require('./routes/postsRouter');

const app = express();
const port = process.env.PORT || 8080;
const testingDatabase = 'black-techy-v2-DB';

mongooose.connect(
  `mongodb://localhost:27017/${testingDatabase}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) =>
    err ? console.log(err) : console.log(`Connected to ${testingDatabase}`)
  // Checks if the database has successfully connected.
);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
