import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AddAgentPage from './pages/AddAgentPage';
import AgentListPage from './pages/AgentListPage';
import UploadCSVPage from './pages/UploadCSVPage';
import AgentTaskViewPage from './pages/AgentTaskViewPage';
import EditAgentPage from './pages/EditAgentPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 👇 If token exists, redirect from '/' to '/dashboard' */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        <Route
          path="/signup"
          element={
            token ? <Navigate to="/dashboard" replace /> : <SignupPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-agent"
          element={
            <ProtectedRoute>
              <AddAgentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <AgentListPage />
            </ProtectedRoute>
          }
        />

        <Route path="/edit-agent/:agentId" element={<ProtectedRoute><EditAgentPage /></ProtectedRoute>} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadCSVPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-tasks"
          element={
            <ProtectedRoute>
              <AgentTaskViewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
