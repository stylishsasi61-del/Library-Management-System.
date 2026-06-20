import React, { useState } from "react";

function FineCalculation() {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [bookName, setBookName] = useState("");
  const [daysLate, setDaysLate] = useState("");

  const calculateFine = () => {
    if (
      !studentName ||
      !rollNo ||
      !bookName ||
      !daysLate
    ) {
      alert("Please fill all fields");
      return;
    }

    const fineAmount = Number(daysLate) * 10;

    const fines =
      JSON.parse(localStorage.getItem("fines")) || [];

    fines.unshift({
      studentName,
      rollNo,
      bookName,
      daysLate,
      fineAmount,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "fines",
      JSON.stringify(fines)
    );

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({
      message: `💰 Fine ₹${fineAmount} added for ${studentName} (Roll No: ${rollNo})`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Fine Added",
      book: `${bookName} | ${studentName} | ₹${fineAmount}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    alert(`Fine Calculated: ₹${fineAmount}`);

    setStudentName("");
    setRollNo("");
    setBookName("");
    setDaysLate("");

    window.location.reload();
  };

  const fines =
    JSON.parse(localStorage.getItem("fines")) || [];

  const totalFine = fines.reduce(
    (sum, fine) => sum + fine.fineAmount,
    0
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
      <h1>💰 Fine Calculation Dashboard</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Manage overdue book fines.
      </p>

      <div
        style={{
          background:
            "linear-gradient(135deg,#dc2626,#b91c1c)",
          color: "white",
          padding: "25px",
          borderRadius: "15px",
          width: "280px",
          marginBottom: "30px",
        }}
      >
        <h3>💰 Total Fine Collected</h3>
        <h1>₹{totalFine}</h1>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>➕ Add Fine</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="Student Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) =>
              setRollNo(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Book Name"
            value={bookName}
            onChange={(e) =>
              setBookName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Days Late"
            value={daysLate}
            onChange={(e) =>
              setDaysLate(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={calculateFine}
            style={{
              padding: "12px 25px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Calculate Fine
          </button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
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
              <th style={thStyle}>Student</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Book</th>
              <th style={thStyle}>Days Late</th>
              <th style={thStyle}>Fine</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {fines.length > 0 ? (
              fines.map((fine, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    {fine.studentName}
                  </td>

                  <td style={tdStyle}>
                    {fine.rollNo}
                  </td>

                  <td style={tdStyle}>
                    {fine.bookName}
                  </td>

                  <td style={tdStyle}>
                    {fine.daysLate}
                  </td>

                  <td style={tdStyle}>
                    ₹{fine.fineAmount}
                  </td>

                  <td style={tdStyle}>
                    {fine.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Fine Records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  width: "220px",
};

const thStyle = {
  padding: "15px",
};

const tdStyle = {
  padding: "15px",
};

export default FineCalculation;