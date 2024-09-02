import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function InventoryInfo() {
  const { jwtToken } = useOutletContext();
  const { postid } = useParams();
  const [inventory, setInventory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      // If not logged in, redirect to login page
      navigate('/log-in');
      return;
    }

    const fetchInventory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/inventory/${postid}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            mode: 'cors',
          }
        );

        const data = await response.json();

        if (response.status === 404) {
          setErrorMessage(data.message || 'Inventory not found');
        } else if (!response.ok) {
          setErrorMessage('Failed to fetch inventory data');
        } else {
          setInventory(data.foundInventory);
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [jwtToken, postid, navigate]);

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
      <h2>Inventory Information</h2>
      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>Title</th>
            <td>{inventory.title}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{inventory.category}</td>
          </tr>
          <tr>
            <th>Storage Location</th>
            <td>{inventory.storage_location}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{inventory.quantity}</td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>{inventory.notes || 'None'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
