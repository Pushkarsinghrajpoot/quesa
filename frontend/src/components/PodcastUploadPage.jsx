import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FileViewer from './FileViewer';
import DynamicUploadDialog from './DynamicUploadDialog';
import axios from 'axios';
const PodcastUploadPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const projectName = location.state?.projectName || 'Sample Project';
    const [hoveredCard, setHoveredCard] = useState(null);
    const [dropzoneHovered, setDropzoneHovered] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', transcript: '' }); 
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null);   
    const [loading, setLoading] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const [showFileViewer, setShowFileViewer] = useState(false);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [selectedUploadType, setSelectedUploadType] = useState('');

    const userId = localStorage.getItem('userId');

    

    const openDialog = (type) => {
        setSelectedUploadType(type);
        setShowUploadDialog(true);
    };

    const closeDialog = () => {
        setShowUploadDialog(false);
        setSelectedUploadType('');
        fetchFiles();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (projectId) {
            fetchFiles();
        }
    }, [projectId]);

    const fetchFiles = async () => {
        try {
            const response = await fetch(`https://quesa-backend.onrender.com/api/project/${projectId}/files`);
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
                setIsUploading(true);
            }
        } catch (error) {
          console.log(error)
            console.error('Error fetching files:', error);
        }
    };

    const openFileViewer = (file) => {
        setCurrentFile(file);
        setShowFileViewer(true);
    };

    const closeFileViewer = () => {
        setShowFileViewer(false);
        setCurrentFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`https://quesa-backend.onrender.com/api/projects/${projectId}/files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Content uploaded successfully!');
                setFormData({ name: '', transcript: '' });
                setFiles((prevFiles) => [...prevFiles, data]);
            } else {
                setMessage(data.message || 'Upload failed');
            }
        } catch (error) {
            setMessage('Error uploading content');
        } finally {
            setLoading(false);
            closeDialog();
        }
    };

    const deleteFile = async (fileId) => {
        if (!window.confirm('Are you sure you want to delete this file?')) return;

        try {
            const response = await fetch(`https://quesa-backend.onrender.com/api/project/files/${fileId}`, { method: 'DELETE' });
            if (response.ok) {
                setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
            } else {
                console.error('Failed to delete file.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleProjectNameClick = () => {
        navigate('/projects-list');
    };
    const styles = {
      nav: {
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#f9f9f9',
      },
      logo: {
          fontSize: '24px',
          color: '#8833FF',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
      },
      sidebar: {
          width: '250px',
          borderRight: '1px solid #eee',
          height: '100vh',
          padding: '20px',
          backgroundColor: '#fdfdfd',
      },
      sidebarItem: {
          marginBottom: '15px',
          color: '#666',
          cursor: 'pointer',
          transition: 'color 0.3s',
      },
      sidebarItemActive: {
          color: '#8833FF',
          fontWeight: 'bold',
      },
      main: {
          padding: '20px',
          flex: 1,
      },
      cardContainer: {
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap',
      },
      card: {
          padding: '20px',
          border: '1px solid #eee',
          borderRadius: '8px',
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s',
      },
      cardHover: {
          transform: 'scale(1.05)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      },
      icon: {
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      },
      dropzone: {
          border: '2px dashed #8833FF',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fafafa',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
      },
      dropzoneHover: {
          backgroundColor: '#f0f0ff',
      },
      button: {
          backgroundColor: '#8833FF',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          marginTop: '15px',
          transition: 'background-color 0.3s',
      },
      buttonHover: {
          backgroundColor: '#661acc',
      },
      dialog: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
      },
      overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
      },
  };
    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <nav style={styles.nav}>
                <a href="/" style={styles.logo}>
                    <span style={{ fontSize: '28px' }}>⚡</span>
                    <span>Ques.AI</span>
                </a>
                <span style={{ color: '#666', margin: '0 10px' }}>/</span>
                <span 
                    onClick={handleProjectNameClick}
                    style={{ 
                        color: '#666', 
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                        textDecoration: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}
                >
                    {projectName}
                </span>
                <span style={{ color: '#666', margin: '0 10px' }}>/</span>
                <span style={{ color: '#8833FF' }}>Add your podcast</span>
            </nav>

            <div style={{ display: 'flex', flex: 1 }}>
                <aside style={styles.sidebar}>
                    <div style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}>+ Add your Podcast(s)</div>
                    <div style={styles.sidebarItem}>🔄 Create & Repurpose</div>
                    <div style={styles.sidebarItem}>🎯 Podcast Widget</div>
                    <div style={styles.sidebarItem}>⭐ Upgrade</div>
                    <div style={{ ...styles.sidebarItem, marginTop: '40px' }}>ℹ️ Help</div>
                </aside>

                <main style={styles.main}>
                    <h1 style={{ marginBottom: '30px' }}>Add Podcast</h1>

                    <div style={styles.cardContainer}>
                        {['RSS Feed', 'YouTube Video', 'Upload Files'].map((type, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.card,
                                    ...(hoveredCard === index ? styles.cardHover : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => openDialog(type)}
                            >
                                <div
                                    style={{
                                        ...styles.icon,
                                        backgroundColor: ['#FFF4EC', '#FFECEC', '#F4ECFF'][index],
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '24px',
                                            color: ['#FF8833', '#FF3333', '#8833FF'][index],
                                        }}
                                    >
                                        {['📻', '📺', '📁'][index]}
                                    </span>
                                </div>
                                <div>
                                    <div>{type}</div>
                                    <div style={{ color: '#666', fontSize: '12px' }}>Lorem ipsum dolor sit.</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    { !isUploading ? (
                        <div
                            style={{
                                ...styles.dropzone,
                                ...(dropzoneHovered ? styles.dropzoneHover : {}),
                            }}
                            onDragEnter={() => setDropzoneHovered(true)}
                            onDragLeave={() => setDropzoneHovered(false)}
                            onClick={() => openDialog('Upload Files')}
                        >
                            <div style={{ color: '#8833FF', fontSize: '40px', marginBottom: '10px' }}>☁️</div>
                            <div style={{ marginBottom: '10px' }}>Select a file or drag and drop here (Podcast Media or Transcription Text)</div>
                            <div style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                            </div>
                            <button
                                style={styles.button}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                            >
                                Select File
                            </button>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2>Your Files</h2>
                                <button
                                    onClick={() => openDialog('Upload Files')}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#8B5CF6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add New File
                                </button>
                            </div>

                            {/* Files Table */}
                            {files.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#F3F4F6' }}>
                                            <th style={{ padding: '12px', textAlign: 'left' }}>No.</th>
                                            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                                            <th style={{ padding: '12px', textAlign: 'left' }}>Created At</th>
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
                                                        <button onClick={() => openFileViewer(file) }
                                                          style={{ 
                                                            padding: '5px 10px', 
                                                            backgroundColor: '#F3F4F6', 
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                        >View</button>
                                                        <button onClick={() => deleteFile(file._id)}
                                                          style={{ 
                                                            padding: '5px 10px', 
                                                            backgroundColor: '#EF4444', 
                                                            color: 'white', 
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                          >Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                    No files uploaded yet
                                </div>
                            )}
                        </div>
                    )}

                    <DynamicUploadDialog 
                        open={showUploadDialog}
                        onClose={closeDialog}
                        projectId={projectId}
                        uploadType={selectedUploadType}
                    />

                    {showFileViewer && (
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
                                fileId={currentFile._id}
                                onClose={closeFileViewer}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
    
};

export default PodcastUploadPage;