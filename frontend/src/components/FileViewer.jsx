import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileViewer = ({ fileId, onClose }) => {
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const projectId = localStorage.getItem('projectId');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`https://quesa-backend.onrender.com/api/files/${fileId}`);
        setFile(response.data);
        setEditedTranscript(response.data.transcript);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch file');
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  const handleSave = async () => {
    try {
      await axios.put(`https://quesa-backend.onrender.com/api/files/${fileId}`, {
        transcript: editedTranscript
      });
      navigate(`/podcast/${projectId}`);
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  const handleDiscard = () => {
    navigate(`/podcast/${projectId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '80%',
      maxWidth: '1000px',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        padding: '10px 0',
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ margin: 0 }}>{file.name}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#8B5CF6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleDiscard}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          style={{
            width: '100%',
            minHeight: '400px',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px',
            lineHeight: '1.5',
            resize: 'vertical'
          }}
        />
      ) : (
        <div style={{
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          fontSize: '16px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap'
        }}>
          {file.transcript}
        </div>
      )}
    </div>
  );
};

export default FileViewer; 