import React, { useEffect, useState } from "react";

function Reports() {
  const [books, setBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setBooks(
      JSON.parse(localStorage.getItem("books")) || []
    );

    setNotifications(
      JSON.parse(localStorage.getItem("notifications")) || []
    );

    setHistory(
      JSON.parse(localStorage.getItem("history")) || []
    );
  }, []);

  const availableBooks = books.length;

  const deletedBooks = history.filter(
    (item) => item.action === "Deleted"
  ).length;

  const totalBooks =
    availableBooks + deletedBooks;

  const totalActivities =
    history.length;

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            color: "#0f172a",
            marginBottom: "5px",
          }}
        >
          📊 Reports Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Overview of library statistics and activities.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "250px",
            boxShadow:
              "0 10px 25px rgba(37,99,235,0.25)",
          }}
        >
          <h3>📚 Total Books</h3>
          <h1>{totalBooks}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#15803d)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "250px",
            boxShadow:
              "0 10px 25px rgba(22,163,74,0.25)",
          }}
        >
          <h3>✅ Available Books</h3>
          <h1>{availableBooks}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#dc2626,#b91c1c)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "250px",
            boxShadow:
              "0 10px 25px rgba(220,38,38,0.25)",
          }}
        >
          <h3>🗑 Deleted Books</h3>
          <h1>{deletedBooks}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#7c3aed,#6d28d9)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "250px",
            boxShadow:
              "0 10px 25px rgba(124,58,237,0.25)",
          }}
        >
          <h3>📜 Activities</h3>
          <h1>{totalActivities}</h1>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "20px",
          }}
        >
          📈 Library Summary
        </h2>

        <p>
          <strong>Total Books:</strong>{" "}
          {totalBooks}
        </p>

        <p>
          <strong>Available Books:</strong>{" "}
          {availableBooks}
        </p>

        <p>
          <strong>Deleted Books:</strong>{" "}
          {deletedBooks}
        </p>

        <p>
          <strong>Total Notifications:</strong>{" "}
          {notifications.length}
        </p>

        <p>
          <strong>Total Activities:</strong>{" "}
          {totalActivities}
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#1e293b",
            color: "white",
          }}
        >
          <h2>📋 Recent Activities</h2>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#e2e8f0",
              }}
            >
              <th style={{ padding: "15px" }}>
                Action
              </th>

              <th style={{ padding: "15px" }}>
                Book Name
              </th>

              <th style={{ padding: "15px" }}>
                Date & Time
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length > 0 ? (
              history.slice(0, 10).map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  <td style={{ padding: "15px" }}>
                    <span
                      style={{
                        background:
                          item.action === "Added"
                            ? "#2563eb"
                            : "#dc2626",
                        color: "white",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {item.action}
                    </span>
                  </td>

                  <td style={{ padding: "15px" }}>
                    {item.book}
                  </td>

                  <td style={{ padding: "15px" }}>
                    {item.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  📭 No Activity Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;