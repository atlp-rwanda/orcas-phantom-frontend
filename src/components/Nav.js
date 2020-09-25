import React from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import About from "./About";
import App from "./app";


const Nav = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
<<<<<<< HEAD
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
=======
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
>>>>>>> a56d48e... eslint fixed, and navbar added css, change directory of app.css
        </div>
        <div className="cmpnt">
          <Route exact path="/" component={App} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Nav;
