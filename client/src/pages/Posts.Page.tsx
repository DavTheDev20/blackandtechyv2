import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [postsArr, setPostsArr] = useState([]);

  const getPosts = () => {
    axios
      .get('http://localhost:8080/posts')
      .then((res) => {
        setPostsArr(res.data);
      })
      .catch((err) => {
        alert('Error retrieving posts, please try again later.');
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="Posts">
      <h1>Posts</h1>
      {postsArr.map((post: any) => {
        return (
          <div className="post" key={post._id}>
            <h2>{post.title}</h2>
            <h3>By: {post.author}</h3>
            <p>{post.postContent}</p>
            <a href={post.link} target="__blank">
              Link
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
