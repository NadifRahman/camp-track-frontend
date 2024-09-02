import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function CamperInfo() {
  const { jwtToken } = useOutletContext();
  const { postid } = useParams();
  const [camper, setCamper] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return; // Don't proceed if the token is null

    const fetchCamper = async () => {
      try {
        console.log('Fetching camper data with token:', jwtToken);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/camper/${postid}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 404) {
          setErrorMessage(data.message || 'Camper not found');
        } else if (!response.ok) {
          setErrorMessage('Failed to fetch camper data');
        } else {
          setCamper(data.camper);
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [jwtToken, postid, navigate]);

  if (!jwtToken) {
    return <div>Loading...</div>; // Show a loading state if the token is not available yet
  }

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
    <div className="container mt-5">
      <h2>Camper Information</h2>
      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{camper.first_name}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{camper.last_name}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{camper.age}</td>
          </tr>
          <tr>
            <th>Guardian Full Name</th>
            <td>{camper.guardian_full_name}</td>
          </tr>
          <tr>
            <th>Guardian Phone</th>
            <td>{camper.guardian_phone}</td>
          </tr>
          <tr>
            <th>Home Address</th>
            <td>{camper.home_address}</td>
          </tr>
          <tr>
            <th>Dietary Restrictions</th>
            <td>{camper.dietary_restrictions || 'None'}</td>
          </tr>
          <tr>
            <th>Medical Conditions</th>
            <td>{camper.medical_conditions || 'None'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
