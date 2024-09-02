import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AttendanceForm() {
  const { jwtToken } = useOutletContext();
  const [date, setDate] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/attendance`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ date }),
        }
      );

      const data = await response.json();

      if (response.status === 409 || response.status === 422) {
        setErrorMessages(data.errors || [data.message]);
        setSuccessMessage(null);
      } else if (!response.ok) {
        setErrorMessages(['Failed to create attendance record']);
        setSuccessMessage(null);
      } else {
        setSuccessMessage('Attendance record created successfully!');
        setErrorMessages(null);
        setDate('');
        //add navigation here CHANGE TO THE ATTENDANCE PAGE
      }
    } catch (err) {
      setErrorMessages(['There was a network error. Please try again later.']);
      setSuccessMessage(null);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create Attendance Record</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessages &&
        errorMessages.map((errorMessage, index) => (
          <div key={index} className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ))}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date (YYYY-MM-DD)
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              required
              value={date}
              onChange={handleDateChange}
              pattern="\d{4}-\d{2}-\d{2}"
              title="Date must be in YYYY-MM-DD format"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Attendance
          </button>
        </form>
      )}
    </div>
  );
}
