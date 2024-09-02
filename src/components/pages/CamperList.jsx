import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './CamperList.css'; // Import the CSS file for animations

export default function CamperList() {
  const { jwtToken } = useOutletContext();
  const [campers, setCampers] = useState([]);
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate('/log-in');
      return;
    }

    const fetchCampers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/campers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || 'Failed to fetch campers');
        } else {
          setCampers(data.campers);
          setFilteredCampers(data.campers); // Initialize filteredCampers with all campers
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampers();
  }, [jwtToken, navigate]);

  useEffect(() => {
    const filtered = campers.filter(
      (camper) =>
        camper.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camper.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCampers(filtered);
  }, [searchQuery, campers]);

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
      <h2 className="mb-4 text-center">Campers List</h2>
      <Link to="/camper-form">
        <div className="btn btn-primary mb-3">Register a camper</div>
      </Link>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredCampers.length > 0 ? (
          <TransitionGroup component={null}>
            {filteredCampers.map((camper) => (
              <CSSTransition key={camper._id} timeout={500} classNames="fade">
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        {camper.first_name} {camper.last_name}
                      </h5>
                      <p className="card-text">
                        <strong>Age:</strong> {camper.age}
                      </p>
                      <Link
                        to={`/camper-info/${camper._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No campers found matching your search.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
