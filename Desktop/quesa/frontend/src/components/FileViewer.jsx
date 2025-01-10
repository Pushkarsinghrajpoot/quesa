import React, { useState } from "react";

const FileViewer = () => {
  // Mock file data
  const files = [
    { id: 1, name: "File1.txt", transcript: "This is the transcript for File 1" },
    { id: 2, name: "File2.txt", transcript: "This is the transcript for File 2" },
  ];

  const [selectedFile, setSelectedFile] = useState(null); // Stores the file being viewed
  const [isEditing, setIsEditing] = useState(false); // Controls edit mode
  const [editableText, setEditableText] = useState(""); // Stores the editable text

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setEditableText(file.transcript); // Initialize editable text with the file's transcript
    setIsEditing(false); // Exit edit mode when viewing a file
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSave = () => {
    if (selectedFile) {
      // Update the selected file's transcript
      setSelectedFile({ ...selectedFile, transcript: editableText });
      setIsEditing(false); // Exit edit mode
    }
  };

  return (
    <div>
      {/* List of files */}
      <h3>Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            <button
              onClick={() => handleViewFile(file)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                border: "1px solid #000",
                backgroundColor: "#f0f0f0",
              }}
            >
              View
            </button>
          </li>
        ))}
      </ul>

      {/* File viewer box */}
      {selectedFile && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #000",
            borderRadius: "5px",
            width: "300px",
          }}
        >
          {/* File name */}
          <h4
            style={{
              margin: "0 0 10px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {selectedFile.name}
            <button
              onClick={isEditing ? handleSave : handleEdit}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                border: "1px solid #000",
                backgroundColor: isEditing ? "#4CAF50" : "#f0f0f0",
                color: isEditing ? "#fff" : "#000",
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </h4>

          {/* Transcript */}
          {isEditing ? (
            <textarea
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid #000",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          ) : (
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {selectedFile.transcript}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
