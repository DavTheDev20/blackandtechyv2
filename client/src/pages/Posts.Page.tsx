import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import CircleLoadingAnimation from '../images/Dual Ring-1.5s-200px.svg';

const Posts = () => {
  const [postsArr, setPostsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const databaseURL = 'https://blkandtechy.com/posts/api'

  const getPosts = async () => {
    try {
      await axios
        .get(databaseURL)
        .then((res) => {
          setIsLoading(false);
          setPostsArr(res.data);
        });
      // setIsLoading(false);
    } catch {
      swal({
        icon: 'error',
        text: 'Error retrieving posts, please try again later.',
      });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="Posts">
      <h1>Posts</h1>
      {isLoading ? <img src={CircleLoadingAnimation} alt="loading..." /> : null}
      {postsArr.map((post: any) => {
        return (
          <div className="post" key={post._id}>
            <h2>{post.title}</h2>
            <h3>By: {post.author}</h3>
            <p>{post.postContent}</p>
            {post.link ? (
              <a href={post.link} target="__blank">
                Link
              </a>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
