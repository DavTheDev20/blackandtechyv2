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
const DB_URL: string =
  process.env.MONGODB_CLOUD_URI ||
  `mongodb://localhost:27017/black-techy-v2-DB`;

mongoose.connect(
  DB_URL, //Connects to mongodb cloud database or local database.
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => (err ? console.log(err) : DB_URL === 'mongodb://localhost:27017/black-techy-v2-DB' ? console.log('Connected to development database'): console.log('Connected to production database.'))
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

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
