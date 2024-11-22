import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    // Handle login/register
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(""); // Reset error message
  
      try {
        const response = await axios.post("https://quesa-backend.onrender.com/", { username });
        const userId = response.data._id;

        // Save userId to localStorage
        localStorage.setItem("userId", userId);
        // Handle successful user creation or login
        if (response.data) {
          // Redirect to dashboard after successful login or registration
          console.log(response.data)
          navigate("/dashboard");
        }
      } catch (err) {
        setError("Something went wrong! Please try again.");
      } finally {
        setLoading(false);
      }
    };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fb",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
    textAlign: "left",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  };

  const inputFocusStyle = {
    outline: "none",
    borderColor: "#007bff",
  };

  const errorMessageStyle = {
    color: "#ff4d4f",
    fontSize: "14px",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  };

  const buttonDisabledStyle = {
    backgroundColor: "#cccccc",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Login / Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#007bff"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>

          {error && <p style={errorMessageStyle}>{error}</p>}

          <button
            type="submit"
            style={{ ...buttonStyle, ...(loading ? buttonDisabledStyle : buttonHoverStyle) }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
