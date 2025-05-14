import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AgentListPage = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/agents', {
        params: { search }
      });
      setAgents(res.data);
      setShowSuccess(true);
      setMessage('Agents loaded successfully');
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setShowError(true);
      setError('Error fetching agents');
    }
  };

 const handleDeleteAgent = async (agentId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this agent?');
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`http://localhost:5000/api/agents/${agentId}`);
    setMessage(res.data.message);
    setShowSuccess(true);
    setAgents(agents.filter((agent) => agent._id !== agentId));
  } catch (err) {
    const errorMessage = err.response?.data?.error || 'Error deleting agent. Please try again.';
    setError(errorMessage);
    setShowError(true);
  }
};

  useEffect(() => {
    fetchAgents();
  }, [search]);

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Agent List</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="hover:bg-gray-50">
                <td className="border p-2">{agent.name}</td>
                <td className="border p-2">{agent.email}</td>
                <td className="border p-2">{agent.mobile}</td>
                <td className="border p-2">
                    <Link to={`/edit-agent/${agent._id}`} className="text-blue-500 hover:underline mr-4">
                      📝 Edit
                    </Link>

                  <button
                    onClick={() => handleDeleteAgent(agent._id)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSuccess && <SuccessToast message={message} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorToast message={error} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default AgentListPage;
