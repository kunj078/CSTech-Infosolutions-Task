import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardSummary = () => {
  const [totalAgents, setTotalAgents] = useState(0);
  const [agentsError, setAgentsError] = useState(null);

  useEffect(() => {
    // Fetch total agents
    const fetchTotalAgents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/agents');
        setTotalAgents(res.data.length);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setAgentsError('Error fetching agents.');
      }
    };

    fetchTotalAgents();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Dashboard Summary</h2>

        <div className="gap-3 mb-6 text-center">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-700">Total Agents</p>
            <p className="text-3xl font-bold text-blue-600">{totalAgents}</p>
          </div>
        </div>

        <div>
          {agentsError && <p className="text-red-500">{agentsError}</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
