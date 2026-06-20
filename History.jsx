import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("history")) || [];

    setHistory(data);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  const filteredHistory = history.filter((item) =>
    item.book.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            color: "#0f172a",
            marginBottom: "5px",
          }}
        >
          📜 History Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Track all book activities and transactions.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "260px",
            boxShadow:
              "0 10px 25px rgba(37,99,235,0.25)",
          }}
        >
          <h3>Total Activities</h3>
          <h1>{history.length}</h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#15803d)",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "260px",
            boxShadow:
              "0 10px 25px rgba(22,163,74,0.25)",
          }}
        >
          <h3>Latest Activity</h3>

          <h2>
            {history.length > 0
              ? history[0].action
              : "No Data"}
          </h2>
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={clearHistory}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        🗑 Clear History
      </button>

      {/* Search */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Search Book History..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "350px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1e293b",
                color: "white",
              }}
            >
              <th style={{ padding: "15px" }}>#</th>
              <th style={{ padding: "15px" }}>Action</th>
              <th style={{ padding: "15px" }}>
                Book Name
              </th>
              <th style={{ padding: "15px" }}>
                Date & Time
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </td>

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
                        display: "inline-block",
                        minWidth: "75px",
                        textAlign: "center",
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
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  📭 No History Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;