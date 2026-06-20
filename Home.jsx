import { Link } from "react-router-dom";

function Home() {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      color: "white",
      padding: "40px",
      fontFamily: "Arial",
    },

    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "60px",
    },

    logo: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#38bdf8",
    },

    navButtons: {
      display: "flex",
      gap: "15px",
    },

    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      background: "#38bdf8",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    hero: {
      textAlign: "center",
      marginTop: "80px",
    },

    title: {
      fontSize: "55px",
      marginBottom: "20px",
    },

    subtitle: {
      fontSize: "22px",
      color: "#cbd5e1",
      marginBottom: "40px",
    },

    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "25px",
      marginTop: "60px",
    },

    card: {
      background: "#1e293b",
      padding: "30px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    },

    cardTitle: {
      fontSize: "22px",
      marginBottom: "15px",
      color: "#38bdf8",
    },
  };

  return (
    <div style={styles.container}>

      <div style={styles.navbar}>
        <div style={styles.logo}>📚 Library MS</div>

        <div style={styles.navButtons}>
          <Link to="/login">
            <button style={styles.button}>Login</button>
          </Link>

          <Link to="/signup">
            <button style={styles.button}>Sign Up</button>
          </Link>
        </div>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.title}>Library Management System</h1>

        <p style={styles.subtitle}>
          Smart Digital Solution for Managing Books, Students, and Library Records
        </p>
      </div>

      <div style={styles.cards}>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📖 Book Management</h2>
          <p>Add, update, and manage all library books efficiently.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>👨‍🎓 Student Records</h2>
          <p>Maintain student details and issued books digitally.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🔍 Search Books</h2>
          <p>Quickly search and find books available in the library.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📅 Issue & Return</h2>
          <p>Track issue dates, return dates, and fine calculations.</p>
        </div>

      </div>
    </div>
  );
}

export default Home;