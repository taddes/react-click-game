import React from "react";
import "./Navbar.css";

const Navbar = (props) => (
  <nav className = "navbar-brand">
    <ul>
      <li className = {props.messageClass}>{props.message}</li>
      <li>Score: {props.score} | Top Score: {props.topscore}</li>
    </ul>
  </nav>
);

export default Navbar;