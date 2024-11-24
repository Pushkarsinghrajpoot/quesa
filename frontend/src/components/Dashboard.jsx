import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from './CreateProjectModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Handle "Create New Project" Button Click
  const handleCreateProject = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            border: "1px solid #ff0000",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          <span
            style={{
              color: "#8B5CF6",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Ques.A
          </span>
        </div>

        {/* Icons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ⚙️
          </span>
          <span
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            🔔
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: "20px",
        }}
      >
        <h1
          style={{
            color: "#8B5CF6",
            fontSize: "32px",
            margin: 0,
          }}
        >
          Create a New Project
        </h1>

        {/* Illustration */}
        <div
          style={{
            maxWidth: "400px",
            margin: "20px 0",
          }}
        >
          <img
            src="https://i.postimg.cc/vmnZgfRG/dashboard-image.jpg"
            alt="Team collaboration illustration"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Lorem Ipsum Text */}
        <p
          style={{
            color: "#666666",
            textAlign: "center",
            maxWidth: "600px",
            lineHeight: "1.6",
            margin: "0 20px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>

        {/* Create Button */}
        <button
          style={{
            backgroundColor: "#1F1A36",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
          onClick={handleCreateProject}
        >
          <span
            style={{
              fontSize: "20px",
            }}
          >
            +
          </span>
          Create New Project
        </button>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}>
            <CreateProjectModal 
              onClose={handleCloseModal}
              fromProjectList={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;