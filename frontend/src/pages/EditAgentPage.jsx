import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';

const countryCodes = [
  { code: '+91', label: 'India (+91)' },
  { code: '+1', label: 'USA (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+971', label: 'UAE (+971)' },
];

const EditAgentPage = () => {
  const [agent, setAgent] = useState({ name: '', countryCode: '+91', mobile: '', email: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { agentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/agents/${agentId}`);
        const fullMobile = res.data.mobile;

        let matchedCode = '+91'; // default fallback
        for (let c of countryCodes) {
          if (fullMobile.startsWith(c.code)) {
            matchedCode = c.code;
            break;
          }
        }

        const onlyMobile = fullMobile.slice(matchedCode.length);

        setAgent({
          name: res.data.name,
          email: res.data.email,
          countryCode: matchedCode,
          mobile: onlyMobile,
        });
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Error fetching agent details. Please try again.');
        setShowError(true);
      }
    };

    if (agentId) fetchAgent();
  }, [agentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!agent.name || agent.name.length < 2) {
      setError('Name must be at least 2 characters long.');
      setShowError(true);
      return false;
    }

    const phoneRegex = /^[0-9]{6,12}$/;
    if (!phoneRegex.test(agent.mobile)) {
      setError('Phone number must be between 6 to 12 digits.');
      setShowError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: agent.name,
      email: agent.email,
      mobile: `${agent.countryCode}${agent.mobile}`,
    };

    try {
      const res = await axios.put(`http://localhost:5000/api/agents/${agentId}`, payload);
      setMessage(res.data.message || 'Agent updated successfully');
      setShowSuccess(true);
      setTimeout(() => navigate('/agents'), 2000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error updating agent. Please try again.');
      setShowError(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={agent.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Country Code</label>
          <select
            name="countryCode"
            value={agent.countryCode}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="mobile"
            value={agent.mobile}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={agent.email}
            disabled
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      {showSuccess && <SuccessToast message={message} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorToast message={error} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default EditAgentPage;
