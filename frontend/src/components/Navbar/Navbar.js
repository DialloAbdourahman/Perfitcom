import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../files/logo.svg";
import "./Navbar.css";
import { useGlobalContext } from "../../context";
import { auth, signOut } from "../../firebase";

const Navbar = () => {
  const { user } = useGlobalContext();
  const signout = () => {
    signOut(auth)
      .then(() => {
        alert("You have signed out succesfully. We hope to see you soon");
      })
      .catch((error) => {
        alert("Failed to signout" + error);
      });
  };

  return (
    <nav className="Navbar">
      <img src={logo} alt="not found" className="logo" />
      <ul className="nav-side">
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/courses"
          >
            Courses
          </NavLink>
        </li>
        {user?.photoURL === "true" && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
        {user ? (
          <>
            <li className="user-name">Hi {user.displayName.substring(0, 5)}</li>
            <button onClick={signout} className="signout">
              Sign out
            </button>
          </>
        ) : (
          <>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? "active" : "")}
                to="/signin"
              >
                Signin
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? "active" : "")}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
