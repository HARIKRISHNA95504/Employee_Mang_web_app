import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import home from "../assets/home.png";
import logo from "../assets/logo.png";
import add from "../assets/add.svg";
import menu from "../assets/menu.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div className="navbar">
      <div className="brand">WorkforcePro</div>

      <div className="nav-toggle" onClick={toggleNav}>
        <img src={menu} alt="Home" className="nav-icon" />
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        
        {isLoggedIn && (<Link to="/" onClick={() => setIsOpen(false)}>
          <img src={home} alt="Home" className="nav-icon" /> Home
        </Link>)}
        
        
         <div className="nav-login">
            {isLoggedIn ? (
              <button className="nav-button" onClick={() => {
                localStorage.removeItem("token");
                window.location.replace("/");
              }}>
                <img src={logo} alt="Logout" className="nav-icon" /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="nav-link">
                <img src={logo} alt="Login" className="nav-icon" /> Login/Register
              </Link>
            )}
          </div>


        {/* <Link to="/add-employee" onClick={() => setIsOpen(false)}>
          <img src={add} alt="Add Employee" className="nav-icon" /> Add Employee
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;

