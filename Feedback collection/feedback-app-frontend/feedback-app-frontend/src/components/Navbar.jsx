import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      <h2>Feedback App</h2>
      <div>
        <Link to="/">Login</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/boards">Boards</Link> |
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
