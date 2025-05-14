import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';

const AgentTaskViewPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then((res) => {
        setData(res.data);
        setSuccessMessage('Tasks loaded successfully!');
        setShowSuccess(true);  // Show success toast
      })
      .catch((err) => {
        setError('Failed to load tasks.');
        setShowError(true);  // Show error toast
        console.error(err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Distributed Tasks</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No tasks assigned to agents yet.</p>
      ) : (
        data.map((agent) => (
          <div key={agent.agentId} className="mb-8">
            <h3 className="text-3xl font-bold mb-4 text-teal-600 text-center">{agent.agentName}</h3>
            <ul className="list-disc list-inside pl-5">
              {agent.tasks.map((task, index) => (
                <li key={index} className="py-2 border-b border-gray-200">
                  <span className="font-medium">{task.firstName}</span> - 
                  <span className="text-gray-600"> {task.phone}</span> - 
                  <span className="text-gray-500"> {task.notes}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      
      {showSuccess && <SuccessToast message={successMessage} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorToast message={error} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default AgentTaskViewPage;
