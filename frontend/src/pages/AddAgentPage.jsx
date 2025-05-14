import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';

const AddAgentPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+91', mobile: '', password: '' });
  const [, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    const { name, email, countryCode, mobile, password } = formData;

    if (!name || !email || !mobile || !password || !countryCode) {
      setError('All fields are required');
      setShowError(true);
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      setShowError(true);
      return;
    }
    if (!validateMobile(mobile)) {
      setError('Mobile number must be 10 digits');
      setShowError(true);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setShowError(true);
      return;
    }

    const payload = {
      name,
      email,
      mobile: `${countryCode}${mobile}`,
      password,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/agents/add', payload);
      setMessage(res.data.message);
      setError('');
      setFormData({ name: '', email: '', countryCode: '+91', mobile: '', password: '' });
      setShowSuccess(true);

      // Redirect to dashboard after successfully adding the agent
      setTimeout(() => {
        navigate('/dashboard'); // Navigate to the dashboard page
      }, 2000); // Wait 2 seconds before redirecting to show success toast
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add agent');
      setShowError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddAgent} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add Agent</h2>

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
          className="w-full p-2 border rounded mb-3" />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="w-full p-2 border rounded mb-3" />

        <div className="flex gap-2 mb-3">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="p-2 border rounded w-1/3"
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+81">🇯🇦 +81</option>
            {/* Add more as needed */}
          </select>

          <input
            type="text"
            name="mobile"
            placeholder="10-digit Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-2/3 p-2 border rounded"
          />
        </div>

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
          className="w-full p-2 border rounded mb-4" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Agent</button>
      </form>

      {showSuccess && <SuccessToast message="Agent added successfully!" onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorToast message={error} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default AddAgentPage;
