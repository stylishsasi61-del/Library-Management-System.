import React, { useState, useEffect } from "react";

function StudentRecords() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(storedStudents);
  }, []);

  const addStudent = () => {
      if (isEditing) {
        const updatedStudents = students.map((student) =>
          student.id === editId
            ? {
                ...student,
                name,
                rollNo,
                department,
                year,
                phone,
              }
            : student
        );

        setStudents(updatedStudents);

        localStorage.setItem(
          "students",
          JSON.stringify(updatedStudents)
        );

        setIsEditing(false);
        setEditId(null);

        setName("");
        setRollNo("");
        setDepartment("");
        setYear("");
        setPhone("");

        return;
      }
    if (
      !name ||
      !rollNo ||
      !department ||
      !year ||
      !phone
    ) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      rollNo,
      department,
      year,
      phone,
    };

    const updatedStudents = [
      ...students,
      newStudent,
    ];

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      action: "Student Added",
      book: name,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    setName("");
    setRollNo("");
    setDepartment("");
    setYear("");
    setPhone("");
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );
    

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };
  const editStudent = (student) => {
  setName(student.name);
  setRollNo(student.rollNo);
  setDepartment(student.department);
  setYear(student.year);
  setPhone(student.phone);

  setEditId(student.id);
  setIsEditing(true);
};

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.rollNo.includes(search)
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
          👨‍🎓 Student Records Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          Manage student information efficiently.
        </p>
      </div>

      {/* Dashboard Cards */}
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
            width: "260px",
            boxShadow:
              "0 10px 25px rgba(37,99,235,0.25)",
          }}
        >
          <h3>👨‍🎓 Total Students</h3>
          <h1>{students.length}</h1>
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
          <h3>🏫 Departments</h3>
          <h1>
            {
              new Set(
                students.map(
                  (student) => student.department
                )
              ).size
            }
          </h1>
        </div>
        <div
  style={{
    background:
      "linear-gradient(135deg,#7c3aed,#6d28d9)",
    color: "white",
    padding: "25px",
    borderRadius: "15px",
    width: "260px",
    boxShadow:
      "0 10px 25px rgba(124,58,237,0.25)",
  }}
>
  <h3>🎓 Final Year Students</h3>
  <h1>
    {
      students.filter(
        (student) => student.year === "4"
      ).length
    }
  </h1>
</div>
<div
  style={{
    background:
      "linear-gradient(135deg,#f59e0b,#d97706)",
    color: "white",
    padding: "25px",
    borderRadius: "15px",
    width: "260px",
    boxShadow:
      "0 10px 25px rgba(245,158,11,0.25)",
  }}
>
  <h3>📚 First Year Students</h3>

  <h1>
    {
      students.filter(
        (student) => student.year === "1"
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
    width: "260px",
    boxShadow:
      "0 10px 25px rgba(220,38,38,0.25)",
  }}
>
  <h3>📋 Student Records</h3>

  <h1>{students.length}</h1>
</div>
      </div>

      {/* Add Student */}
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
          ➕ Add New Student
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
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={addStudent}
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
            {isEditing ? "Update Student" : "Add Student"}
          </button>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            ...inputStyle,
            width: "350px",
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
              <th style={thStyle}>Student ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  style={{
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  <td style={tdStyle}>
                    STU{student.id.toString().slice(-4)}
                    </td>
                  <td style={tdStyle}>
                    {student.name}
                  </td>

                  <td style={tdStyle}>
                    {student.rollNo}
                  </td>

                  <td style={tdStyle}>
                    {student.department}
                  </td>

                  <td style={tdStyle}>
                    {student.year}
                  </td>

                  <td style={tdStyle}>
                    {student.phone}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                        fontSize: "13px",
                       }}
                               >
                       Active
                     </span>
                </td>
                 <td style={tdStyle}>

  <button
  onClick={() => editStudent(student)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      marginRight: "10px",
    }}
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteStudent(student.id)
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
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#64748b",
                  }}
                >
                  No Students Found
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
  padding: "15px"
};

export default StudentRecords;