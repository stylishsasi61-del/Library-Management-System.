import React, { useState } from "react";

function IssueBook() {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [bookName, setBookName] = useState("");

  const issueBook = () => {
    if (!studentName || !rollNo || !bookName) {
      alert("Please fill all fields");
      return;
    }

    const issuedBooks =
      JSON.parse(localStorage.getItem("issuedBooks")) || [];

    const newIssue = {
      studentName,
      rollNo,
      bookName,
      date: new Date().toLocaleString(),
      status: "Issued",
    };

    issuedBooks.unshift(newIssue);

    localStorage.setItem(
      "issuedBooks",
      JSON.stringify(issuedBooks)
    );

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({
      message: `📚 Book "${bookName}" issued to ${studentName} (Roll No: ${rollNo})`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Book Issued",
      book: `${bookName} | ${studentName} | Roll No: ${rollNo}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    alert("Book Issued Successfully");

    setStudentName("");
    setRollNo("");
    setBookName("");

    window.location.reload();
  };

  const returnBook = (index) => {
    const issuedBooks =
      JSON.parse(localStorage.getItem("issuedBooks")) || [];

    const returnedBook = issuedBooks[index];

    issuedBooks[index].status = "Returned";

    localStorage.setItem(
      "issuedBooks",
      JSON.stringify(issuedBooks)
    );

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Book Returned",
      book: `${returnedBook.bookName} | ${returnedBook.studentName} | Roll No: ${returnedBook.rollNo}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({
      message: `📖 Book "${returnedBook.bookName}" returned by ${returnedBook.studentName} (Roll No: ${returnedBook.rollNo})`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    window.location.reload();
  };

  const issuedBooks =
    JSON.parse(localStorage.getItem("issuedBooks")) || [];

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        📚 Issue & Return Books
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Manage book issue and return transactions.
      </p>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#1e293b",
          }}
        >
          ➕ Issue New Book
        </h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) =>
              setRollNo(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) =>
              setBookName(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={issueBook}
            style={{
              padding: "12px 25px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Issue Book
          </button>
        </div>
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
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Book Name</th>
              <th style={thStyle}>Issue Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {issuedBooks.length > 0 ? (
              issuedBooks.map((book, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    {book.studentName}
                  </td>

                  <td style={tdStyle}>
                    {book.rollNo}
                  </td>

                  <td style={tdStyle}>
                    {book.bookName}
                  </td>

                  <td style={tdStyle}>
                    {book.date}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          book.status === "Returned"
                            ? "#fee2e2"
                            : "#dcfce7",
                        color:
                          book.status === "Returned"
                            ? "#991b1b"
                            : "#166534",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {book.status === "Issued" && (
                      <button
                        onClick={() =>
                          returnBook(index)
                        }
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "8px 15px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Return
                      </button>
                    )}
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
                    color: "#64748b",
                  }}
                >
                  No Issued Books Found
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

export default IssueBook;