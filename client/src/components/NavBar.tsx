import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props: any) => {
  const [menu, setMenu] = useState(false);

  return (
    <nav>
      <div className="mobile-elements">
        {/* eslint-disable-next-line */}
        <button onClick={() => setMenu(true)} className="hamburger-button">
          <i
            className="hamburger-icon fas fa-bars fa-2x"
            style={{ color: '#ffff' }}
          ></i>
        </button>
        <Link to={props.homeLink} className="home-link-mobile">
          Black & Techy
        </Link>
        <div
          className="mobile-menu"
          style={menu ? { display: 'block' } : { display: 'none' }}
        >
          {/* eslint-disable-next-line */}
          <a href="#" onClick={() => setMenu(false)}>
            <i className="mobile-menu-exit-button far fa-times-circle fa-2x"></i>
          </a>
          <ul>
            <li>
              <Link
                to={props.postsLink}
                className="posts-link-mobile"
                onClick={() => setMenu(false)}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to={props.createLink}
                className="create-link-mobile"
                onClick={() => setMenu(false)}
              >
                Create
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ul>
        <li>
          <Link to={props.postsLink} className="posts-link">
            Posts
          </Link>
        </li>
        <li>
          <Link to={props.homeLink} className="home-link">
            Black & Techy
          </Link>
        </li>
        <li>
          <Link to={props.createLink} className="create-link">
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
