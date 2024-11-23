import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProjectModal = () => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName) {
      alert("Please enter a project name");
      return;
    }

    // Create the project data to send in the request
    const projectData = {
      name: projectName,
      userId: userId,
    };

    try {
      // Make the POST request to create a new project
      const response = await axios.post("https://quesa-backend.onrender.com/api/projects", projectData);

      // On successful creation, redirect to the projects list or another page
      console.log(response.data);
      const projectId = response.data._id
      localStorage.setItem('projectId' , projectId)
      console.log(projectId)
      navigate("/projects-list");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    }
  };

  const handleCancel = () => {
    navigate('/'); // Go back to Dashboard
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '400px',
        textAlign: 'center',
      }}
    >
      <h2>Create Project</h2>
      <input
        type="text"
        placeholder="Enter Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      {error && (
        <p
          style={{
            color: 'red',
            fontSize: '14px',
            marginTop: '-5px',
          }}
        >
          {error}
        </p>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <button
          style={{
            color: 'red',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          style={{
            backgroundColor: '#8B5CF6',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateProjectModal;