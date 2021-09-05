import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Admin = () => {
  const [postsArr, setPostsArr] = useState([]);

  const getPosts = () => {
    axios
      .get('http://localhost:8080/posts/api' || 'https://blackandtechyv2.herokuapp.com/posts/api')
      .then((res) => setPostsArr(res.data))
      .catch((err) => swal({ icon: 'error', text: 'Error retrieving posts.' }));
  };

  const deletePost = ({ target }: any) => {
    const { value } = target;

    axios({
      method: 'DELETE',
      url: 'http://localhost:8080/posts/api/delete' || 'https://blackandtechyv2.herokuapp.com/posts/api/delete',
      data: {
        _id: value,
      },
    })
      .then((res: any) => {
        console.log(res.msg);
        swal({ icon: 'success', text: 'Post successfully deleted' });
        getPosts();
      })
      .catch((err) =>
        swal({ icon: 'error', text: 'Error deleting post please try again.' })
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="Admin">
      <h1>Admin</h1>
      <table>
        <thead>
          <tr>
            <td>
              <h3>id</h3>
            </td>
            <td>
              <h3>author</h3>
            </td>
            <td>
              <h3>title</h3>
            </td>
            <td>
              <h3>postContent</h3>
            </td>
            <td>
              <h3>link</h3>
            </td>
            <td>
              <h3>dateCreated</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {postsArr.map((post: any) => {
            return (
              <tr key={post._id} className="post-row">
                <td>{post._id}</td>
                <td>{post.author}</td>
                <td>{post.title}</td>
                <td>{post.postContent}</td>
                {post.link == null ? <td>no link</td> : <td>{post.link}</td>}
                <td>{post.dateCreated}</td>
                <button
                  className="delete-button"
                  value={post._id}
                  onClick={deletePost}
                >
                  Delete Post
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <button>Drop Database</button> */}
      {/* Add Drop Feature At later time. */}
    </div>
  );
};

export default Admin;
