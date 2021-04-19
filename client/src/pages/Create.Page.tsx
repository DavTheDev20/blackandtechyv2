import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [post, setPost] = useState({
    author: '',
    title: '',
    postContent: '',
    link: '',
  });

  const handleChange = ({ target }: any) => {
    const { name, value } = target;

    if (name === 'author') {
      setPost((prevValue) => {
        return {
          author: value,
          title: prevValue.title,
          postContent: prevValue.postContent,
          link: prevValue.link,
        };
      });
    } else if (name === 'title') {
      setPost((prevValue) => {
        return {
          author: prevValue.author,
          title: value,
          postContent: prevValue.postContent,
          link: prevValue.link,
        };
      });
    } else if (name === 'content') {
      setPost((prevValue) => {
        return {
          author: prevValue.author,
          title: prevValue.title,
          postContent: value,
          link: prevValue.link,
        };
      });
    } else if (name === 'link') {
      setPost((prevValue) => {
        return {
          author: prevValue.author,
          title: prevValue.title,
          postContent: prevValue.postContent,
          link: value,
        };
      });
    }
  };

  const handleSubmission = (event: any) => {
    event.preventDefault();

    let postItems: any = [];
    Object.values(post).forEach((item) => {
      postItems.push(item);
    });

    for (var i = 0; i < postItems.length - 2; i++) {
      if (postItems[i] === '') {
        alert('Please enter data in every box.');
        return;
      }
    }

    axios({
      method: 'POST',
      url: 'http://localhost:8080/posts/save',
      data: {
        author: post.author,
        title: post.title,
        postContent: post.postContent,
        link: post.link,
      },
    })
      .then((res) => {
        console.log(res.data.msg);
        setPost({
          author: '',
          title: '',
          postContent: '',
          link: '',
        });
      })
      .catch((err) => {
        alert('Error submitting post, please try again.');
      });
  };

  const [addLink, setAddLink] = useState(false);

  const toggleAddlink = (event: any) => {
    event.preventDefault();
    setAddLink((value) => !value);
  };

  return (
    <div className="Create">
      <h1>Create</h1>

      <form onSubmit={handleSubmission}>
        <input
          className="post-inputs"
          type="text"
          placeholder="Name"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <input
          className="post-inputs"
          type="text"
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <textarea
          className="post-inputs"
          rows={6}
          placeholder="enter post here..."
          name="content"
          value={post.postContent}
          onChange={handleChange}
        />
        <button onClick={toggleAddlink}>Add link</button>{' '}
        <input
          type="text"
          placeholder="link"
          style={addLink ? { display: 'inline' } : { display: 'none' }}
          name="link"
          value={post.link}
          onChange={handleChange}
        />
        <button className="post-inputs post-button">Post</button>
      </form>
    </div>
  );
};

export default Create;
