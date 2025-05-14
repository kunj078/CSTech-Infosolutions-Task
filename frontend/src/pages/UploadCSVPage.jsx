import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';

const UploadCSVPage = () => {
  const [file, setFile] = useState(null);
  const [, setParsedData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateFileType = (file) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return file && validTypes.includes(file.type);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateFileType(file)) {
      setError('Only CSV or Excel files are allowed');
      setShowError(true);
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const fileContents = reader.result;
      Papa.parse(fileContents, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase(),
        complete: (result) => {
          setParsedData(result.data);
          validateCSV(result.data);
        }
      });
    };
    reader.readAsText(file);
  };

  const validateCSV = (data) => {
    const errors = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2;
      if (!row.firstname?.trim() || !row.phone?.trim() || !row.notes?.trim()) {
        errors.push(`Row ${rowNumber}: Missing required fields (firstname, phone, or notes).`);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsFileValid(false);
    } else {
      setValidationErrors([]);
      setIsFileValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      setShowError(true);
      return;
    }

    if (!isFileValid) {
      setError('CSV file is invalid, please check required fields');
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true); // Show spinner

    try {
      const res = await axios.post('http://localhost:5000/api/upload/upload', formData);
      setMessage(res.data.message);
      setError('');
      setShowSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        navigate('/view-tasks', { state: { successMessage: 'CSV uploaded and tasks distributed successfully!' } });
      }, 2000);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.error || 'Upload failed');
      setShowError(true);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Upload CSV or Excel</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          {validationErrors.length > 0 && (
            <div className="text-red-600 mt-2">
              <ul className="list-disc pl-5">
                Your file should have the following format: FirstName, PhoneNumber, Notes
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFileValid || isLoading}
            className={`bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 ${(!isFileValid || isLoading) && 'opacity-50 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Uploading...
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>

      {showSuccess && <SuccessToast message={message} onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorToast message={error} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default UploadCSVPage;
