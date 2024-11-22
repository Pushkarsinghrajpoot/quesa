import React, { useState } from 'react';
import axios from 'axios';

const DynamicUploadDialog = ({ open, onClose, clickedButton, projectId }) => {
  const [formData, setFormData] = useState({ name: '', transcript: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/projects/${projectId}/files`, formData);
      console.log('File uploaded:', response.data);
      onClose(); // Close the dialog on successful upload
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
    }
  };

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2 style={styles.title}>Upload from {clickedButton}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Transcript:</label>
            <textarea
              name="transcript"
              value={formData.transcript}
              onChange={handleChange}
              style={{ ...styles.input, height: '100px' }}
              required
            ></textarea>
          </div>
          <button type="submit" style={styles.uploadButton}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 20px',
    fontSize: '18px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default DynamicUploadDialog;