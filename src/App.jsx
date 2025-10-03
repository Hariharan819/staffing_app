import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import LiveJobs from './components/jobs/LiveJobs/LiveJobs.jsx';
import Candidates from './components/candidates/Candidates';
import AddJob from "./components/jobs/AddJobs/AddJob.jsx";
import "./index.css";

import ArchivedJobs from './components/ArchivedJobs/ArchivedJobs.jsx';
import Newresponses from './components/Newresponses/Newresponses.jsx';
import Selectedcandidates from './components/Selectedcandidates/Selectedcandidates.jsx';
import Submittedcandidates from './components/Submittedcandidates/Submittedcandidates.jsx';
import ArchivedCandidates from './components/ArchivedCandidates/ArchivedCandidates.jsx';
// import UserProfile from './components/Newresponses/UserProfile.jsx';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="live-jobs" element={<LiveJobs />} />
              <Route path="candidates" element={<Candidates />} />
               <Route path="add-job" element={<AddJob />} />
              <Route path="archived-jobs" element={<ArchivedJobs/>} />
              <Route path="new-responses" element={<Newresponses/>} />
              <Route path="selected-candidates" element={<Selectedcandidates/>} />
              <Route path="submitted-candidates" element={<Submittedcandidates/>} />
              <Route path="archived-responses" element={<ArchivedCandidates/>} />
            </Route>
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;