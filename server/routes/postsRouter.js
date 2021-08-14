const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');
const postsRouter = express.Router();

postsRouter

  .get('/api', (req, res) => {
    //Looks for and returns all posts in database.

    Post.find((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        res.json(posts).status(200);
      }
    });
  })

  .post('/api/save', (req, res) => {
    const newPost = new Post({
      author: req.body.author,
      title: req.body.title,
      postContent: req.body.postContent,
      link: req.body.link ? req.body.link : null,
    });

    newPost.save((err, post) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Post was saved');
        res.json({ msg: `Post by: ${post.author}, was saved.` }).status(200);
      }
    });
  })

  .delete('/api/delete', (req, res) => {
    Post.deleteOne({ _id: req.body._id }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Post was deleted.');
        res
          .json({
            result: response,
            msg: 'Post has been deleted successfully.',
          })
          .status(200);
      }
    });
  });

module.exports = postsRouter;
