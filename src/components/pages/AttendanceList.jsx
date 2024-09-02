import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import AttendanceForm from './AttendanceForm';

export default function AttendanceList() {
  const { jwtToken } = useOutletContext();
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/attendances`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            mode: 'cors',
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || 'Failed to fetch attendances');
        } else {
          setAttendances(data.attendances);
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [jwtToken]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{errorMessage}</div>
      </div>
    );
  }

  return (
    <>
      <AttendanceForm></AttendanceForm>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Attendance Records</h2>
        <ul className="list-group">
          {attendances.map((attendance) => (
            <li key={attendance._id} className="list-group-item">
              <Link
                to={`/attendance/${attendance._id}`}
                className="text-decoration-none"
              >
                {new Date(attendance.date).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
