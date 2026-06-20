import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const defaultBooks = [
      {
        id: 1,
        title: "Python Programming",
        author: "Guido van Rossum",
        status: "Available",
      },
      {
        id: 2,
        title: "Java Programming",
        author: "James Gosling",
        status: "Available",
      },
      {
        id: 3,
        title: "Database Management System",
        author: "Raghu Ramakrishnan",
        status: "Available",
      },
      {
        id: 4,
        title: "Operating Systems",
        author: "Galvin",
        status: "Available",
      },
      {
        id: 5,
        title: "Computer Networks",
        author: "Andrew Tanenbaum",
        status: "Available",
      },
    ];

    const storedBooks =
      JSON.parse(localStorage.getItem("books")) || [];

    if (storedBooks.length === 0) {
      localStorage.setItem(
        "books",
        JSON.stringify(defaultBooks)
      );
      setBooks(defaultBooks);
    } else {
      setBooks(storedBooks);
    }
  }, []);

  const addBook = () => {
    if (!bookName || !author) {
      alert("Please fill all fields");
      return;
    }

    const newBook = {
      id: Date.now(),
      title: bookName,
      author: author,
      status: "Available",
    };

    const updatedBooks = [...books, newBook];

    setBooks(updatedBooks);

    localStorage.setItem(
      "books",
      JSON.stringify(updatedBooks)
    );

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift(`Book Added : ${bookName}`);

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Added",
      book: bookName,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    setBookName("");
    setAuthor("");
  };

  const deleteBook = (id, title) => {
    const updatedBooks = books.filter(
      (book) => book.id !== id
    );

    setBooks(updatedBooks);

    localStorage.setItem(
      "books",
      JSON.stringify(updatedBooks)
    );
    const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({
  message: `❌ Book Deleted : ${title}`,
  time: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);
    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Deleted",
      book: title,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  };

  const searchBook = () => {
    const found = books.find(
      (book) =>
        book.title.toLowerCase() ===
        search.toLowerCase()
    );

    if (found) {
      alert(
        `Book Found!\n\nTitle: ${found.title}\nAuthor: ${found.author}\nStatus: ${found.status}`
      );
    } else {
      alert("Sorry! Book not available.");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

 return (

  <div
    style={{
      padding: "40px",
      background: "#f8fafc",
      minHeight: "100vh",
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
        📚 Library Management Admin Dashboard
      </h1>

```
  <p
    style={{
      color: "#64748b",
      fontSize: "18px",
    }}
  >
    Manage books, notifications, history and reports efficiently.
  </p>
</div>

<div
  style={{
    display: "flex",
    gap: "25px",
    marginBottom: "35px",
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
      width: "250px",
      boxShadow:
        "0 10px 25px rgba(37,99,235,0.25)",
    }}
  >
    <h3>📚 Total Books</h3>
    <h1>{books.length}</h1>
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
    <h3>🔔 Notifications</h3>
    <h1>
      {
        (
          JSON.parse(
            localStorage.getItem("notifications")
          ) || []
        ).length
      }
    </h1>
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
    <h3>📜 History</h3>
    <h1>
      {
        (
          JSON.parse(
            localStorage.getItem("history")
          ) || []
        ).length
      }
    </h1>
  </div>
</div>

<div
  style={{
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "30px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      color: "#1e293b",
      marginBottom: "20px",
    }}
  >
    ➕ Add New Book
  </h2>

  <input
    type="text"
    placeholder="Book Name"
    value={bookName}
    onChange={(e) =>
      setBookName(e.target.value)
    }
    style={{
      padding: "12px",
      marginRight: "10px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      width: "250px",
    }}
  />

  <input
    type="text"
    placeholder="Author"
    value={author}
    onChange={(e) =>
      setAuthor(e.target.value)
    }
    style={{
      padding: "12px",
      marginRight: "10px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      width: "250px",
    }}
  />

  <button
    onClick={addBook}
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
    ➕ Add Book
  </button>
</div>

<div style={{ marginBottom: "25px" }}>
  <input
    type="text"
    placeholder="🔍 Search Book..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
      padding: "12px",
      width: "320px",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
    }}
  />

  <button
    onClick={searchBook}
    style={{
      padding: "12px 20px",
      background:
        "linear-gradient(135deg,#16a34a,#15803d)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      marginLeft: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Search
  </button>
</div>

<table
  style={{
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
  }}
>
  <thead>
    <tr
      style={{
        background: "#1e293b",
        color: "white",
      }}
    >
      <th style={{ padding: "15px" }}>
        Book Name
      </th>
      <th style={{ padding: "15px" }}>
        Author
      </th>
      <th style={{ padding: "15px" }}>
        Status
      </th>
      <th style={{ padding: "15px" }}>
        Action
      </th>
    </tr>
  </thead>

  <tbody>
    {filteredBooks.map((book) => (
      <tr key={book.id}>
        <td style={{ padding: "15px" }}>
          {book.title}
        </td>

        <td style={{ padding: "15px" }}>
          {book.author}
        </td>

        <td style={{ padding: "15px" }}>
          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {book.status}
          </span>
        </td>

        <td style={{ padding: "15px" }}>
          <button
            onClick={() =>
              deleteBook(book.id, book.title)
            }
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🗑 Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
);
}
export default AdminPanel;