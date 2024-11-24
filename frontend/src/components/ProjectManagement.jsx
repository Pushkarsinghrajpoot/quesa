import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileViewer from './FileViewer';

const ProjectManagement = () => {
  const  projectId  = localStorage.getItem("projectId")
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedFileId, setSelectedFileId] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!projectId) {
        setError('Project ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/files`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
        setError(error.response?.data?.message || 'Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [projectId]);

  const viewFile = (fileId) => {
    console.log('Viewing file with ID:', fileId);
    setSelectedFileId(fileId);
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/project/files/${fileId}`);
      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert(error.response?.data?.message || 'Failed to delete file');
    }
  };

  const handleAddPodcast = () => {
    navigate(`/podcast/${projectId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid #e5e7eb', padding: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#8B5CF6', marginBottom: '20px' }}>
          Ques.AI
        </div>
        <div 
          onClick={handleAddPodcast}
          style={{ 
            cursor: 'pointer', 
            padding: '10px', 
            backgroundColor: '#F3F4F6', 
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#E5E7EB'
            }
          }}
        >
          + Add your Podcast(s)
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Project Files</h1>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#F3F4F6', 
            borderRadius: '8px',
            flex: 1 
          }}>
            <h3>Total Files</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{files.length}</p>
          </div>
          {/* Add more stat cards as needed */}
        </div>

        {/* Files Table */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Files</h2>
            <button
              onClick={handleAddPodcast}
              style={{
                padding: '8px 16px',
                backgroundColor: '#8B5CF6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#7C3AED'
                }
              }}
            >
              Add New File
            </button>
          </div>

          {files.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No files found. Click "Add New File" to upload your first file.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>No.</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={file._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{index + 1}</td>
                    <td style={{ padding: '12px' }}>{file.name}</td>
                    <td style={{ padding: '12px' }}>{new Date(file.createdAt).toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => viewFile(file._id)}
                          style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#F3F4F6', 
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            ':hover': {
                              backgroundColor: '#E5E7EB'
                            }
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteFile(file._id)}
                          style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#EF4444', 
                            color: 'white', 
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            ':hover': {
                              backgroundColor: '#DC2626'
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedFileId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}>
          <FileViewer 
            fileId={selectedFileId} 
            onClose={() => setSelectedFileId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;