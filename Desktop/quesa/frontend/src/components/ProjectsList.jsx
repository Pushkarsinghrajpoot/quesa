import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Fetch userId from local storage

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) {
        setError('User ID is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/projects?userId=${userId}`);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch projects');
        }
        const data = await response.json();
        
        

        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewProjectName('');
  };

  // Handle creating a new project
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      alert('Project name cannot be empty!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newProjectName, userId }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to create project');
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      closeModal();
    } catch (err) {
      alert(`Error creating project: ${err.message}`);
    }
  };

  // Render loading or error state
  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#8B5CF6' }}>
            <circle cx="16" cy="16" r="12" />
          </svg>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span style={{ color: '#8B5CF6' }}>Ques.</span>
            <span style={{ color: '#6B7280' }}>AI</span>
          </span>
        </div>

        {/* Create New Project Button */}
        <button
          onClick={openModal}
          style={{
            backgroundColor: '#1F1A36',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#292148')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1F1A36')}
        >
          <span style={{ fontSize: '18px' }}>+</span> Create New Project
        </button>
      </div>

      {/* Projects Section */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#8B5CF6' }}>Projects</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                width: '280px',
                padding: '16px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => navigate(`/podcast/${project.id}`, { state: { projectName: project.name } })}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                {/* Project Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#10B981',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {project.name.charAt(0).toUpperCase()}
                </div>

                {/* Project Info */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>{project.files || 0} Files</div>
                </div>
              </div>

              {/* Last Edited */}
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                Last edited {project.lastEdited || 'unknown'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Creating a New Project */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              width: '400px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2 style={{ fontSize: '20px', color: '#8B5CF6', marginBottom: '16px' }}>Create New Project</h2>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                marginBottom: '16px',
                fontSize: '14px',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#8B5CF6',
                  color: '#ffffff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
