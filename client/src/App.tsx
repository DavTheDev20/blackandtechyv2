import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.Page';
import Posts from './pages/Posts.Page';
import Create from './pages/Create.Page';
import Admin from './pages/Admin.Page';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const admin_path = `/posts/api/admin`;

  return (
    <Router>
      <div>
        <NavBar postsLink="/posts" homeLink="/" createLink="/create" />
        <Switch>
          <Route path={admin_path}>
            <Admin />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
