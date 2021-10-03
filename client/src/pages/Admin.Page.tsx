import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useLocation } from 'react-router';
// import queryString from 'querystring'; (This can be used to parse url queries as well.)

const Admin = () => {
  const [postsArr, setPostsArr] = useState([]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const pass = searchParams.get('pass');
  // console.log(pass);

  axios.defaults.headers.common['Auth-Token'] =
    process.env['REACT_APP_AUTH_TOKEN'];

  const apiURL = process.env['REACT_APP_API_URL']!;

  const getPosts = () => {
    axios
      .get(apiURL)
      .then((res) => setPostsArr(res.data))
      .catch((err) => swal({ icon: 'error', text: 'Error retrieving posts.' }));
  };

  const deletePost = ({ target }: any) => {
    const { value } = target;

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, a post cannot be retrived.',
      icon: 'warning',
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: 'DELETE',
          url: apiURL + '/delete',
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
            swal({
              icon: 'error',
              text: 'Error deleting post please try again.',
            })
          );
      }
    });
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (pass === process.env.REACT_APP_ADMIN_PASS) {
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
                  <td>
                    {post.postContent.length > 25
                      ? post.postContent.slice(0, 25) + '...'
                      : post.postContent}
                  </td>
                  {post.link == null ? (
                    <td>no link</td>
                  ) : (
                    <td>
                      <a href={post.link}>{post.link}</a>
                    </td>
                  )}
                  <td>{post.dateCreated.slice(0, 10)}</td>
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
  } else {
    return (
      <div>
        <h1>🔒Unauthorized🔒</h1>
      </div>
    );
  }
};

export default Admin;
