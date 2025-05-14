import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">My App</h2>
      <div className="flex space-x-4 items-center">
        {!token ? (
          <>
            <Link
              to="/"
              className={`hover:underline ${isActive('/') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`hover:underline ${isActive('/signup') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className={`hover:underline ${isActive('/dashboard') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className={`hover:underline ${isActive('/upload') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Upload CSV
            </Link>
            <Link
              to="/view-tasks"
              className={`hover:underline ${isActive('/view-tasks') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              View Tasks
            </Link>
            <Link
              to="/add-agent"
              className={`hover:underline ${isActive('/add-agent') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Add Agent
            </Link>
            <Link
              to="/agents"
              className={`hover:underline ${isActive('/agents') ? 'text-yellow-400 font-semibold' : ''}`}
            >
              View Agents
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
