import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateProjectModal from './components/CreateProjectModal';
import ProjectsList from './components/ProjectsList';
import ProjectManagement from './components/ProjectManagement'; // Import the new component
import Login from './components/Login';

// Import the Podcast components
import PodcastUploadPage from './components/PodcastUploadPage';

// const projectId = localStorage.getItem(projectId);
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for the create project modal */}
        <Route path="/create-project" element={<CreateProjectModal />} />

        {/* Route for the project list page */}
        <Route path="/projects-list" element={<ProjectsList />} />

        {/* Route for the individual project management page */}
        <Route path ="/project/:projectId" element={<ProjectManagement />} />

        {/* Dynamic route for the podcast upload page */}
        <Route path="/podcast/:projectId" element={<PodcastUploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
