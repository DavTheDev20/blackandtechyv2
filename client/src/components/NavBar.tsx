import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props: any) => {
  return (
    <nav>
      <i
        className="hamburger-icon fas fa-bars fa-2x"
        style={{ color: '#ffff' }}
      ></i>
      <Link to={props.homeLink} className="home-link-mobile">
        Black & Techy
      </Link>
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
