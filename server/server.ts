require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Post = require('./models/post');
const postsRouter = require('./routes/postsRouter');

const app = express();
const port = process.env.PORT || 8080;
const localDB_URL = `mongodb://localhost:27017/black-techy-v2-DB`;

mongoose.connect(
  process.env.MONGODB_CLOUD_URI, //Connects to mongodb cloud database.
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) =>
    err ? console.log(err) : console.log('Connected to remote database')
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

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
