import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1e293b",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/admin">Admin Panel</Link>
      <Link to="/students">Students</Link>
      <Link to="/issue-book">Issue & Return</Link>
      <Link to="/fine-calculation">Fine Calculation</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export default Navbar;