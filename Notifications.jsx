import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(data);
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
      }}
    >
      <h1>🔔 Notifications Center</h1>

      <button
        onClick={clearNotifications}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Clear All Notifications
      </button>

      {notifications.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          No Notifications Available
        </div>
      ) : (
        notifications.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{item.message}</h3>
            <p>{item.time}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;