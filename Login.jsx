import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser =
      JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      alert("Login Successful!");

      navigate("/admin");
    } else {
      alert("Invalid Email or Password");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      fontFamily: "Arial",
    },

    formBox: {
      background: "white",
      padding: "40px",
      borderRadius: "15px",
      width: "350px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    },

    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#0f172a",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#38bdf8",
      border: "none",
      color: "white",
      fontSize: "18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    text: {
      marginTop: "20px",
      textAlign: "center",
    },

    link: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;