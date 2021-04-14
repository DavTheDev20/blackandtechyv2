import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props: any) => {
  return (
    <nav>
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
