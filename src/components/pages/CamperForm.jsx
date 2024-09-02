import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CamperForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    guardian_full_name: '',
    guardian_phone: '',
    home_address: '',
    dietary_restrictions: '',
    medical_conditions: '',
  });

  const [errorMessages, setErrorMessages] = useState(null); //array of error messages or null
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/camper`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          mode: 'cors',
        }
      );

      const data = await response.json();

      if (response.status === 422) {
        // validation errors from the backend
        setErrorMessages(data.errors);
      } else if (!response.ok) {
        // other errors
        setErrorMessages([
          'An unexpected error occurred, please try again later',
        ]);
      } else {
        // successful registration
        setErrorMessages(null);
        navigate('/'); //CHANGE TO SOMETHING ELSE LATER
      }
    } catch (err) {
      setErrorMessages(['Network error, please try again later']);
      console.error('Error:', err);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Register Camper</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="form-control"
            required
            maxLength={20}
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="form-control"
            required
            maxLength={20}
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            required
            min={1}
            max={17}
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guardian_full_name" className="form-label">
            Guardian Full Name
          </label>
          <input
            type="text"
            name="guardian_full_name"
            id="guardian_full_name"
            className="form-control"
            required
            maxLength={50}
            value={formData.guardian_full_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guardian_phone" className="form-label">
            Guardian Phone
          </label>
          <input
            type="tel"
            name="guardian_phone"
            id="guardian_phone"
            className="form-control"
            required
            pattern="\d{10}"
            value={formData.guardian_phone}
            onChange={handleChange}
          />
          <small className="form-text text-muted">
            Please enter a 10-digit phone number.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="home_address" className="form-label">
            Home Address
          </label>
          <textarea
            name="home_address"
            id="home_address"
            className="form-control"
            required
            maxLength={200}
            value={formData.home_address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dietary_restrictions" className="form-label">
            Dietary Restrictions
          </label>
          <textarea
            name="dietary_restrictions"
            id="dietary_restrictions"
            className="form-control"
            maxLength={200}
            value={formData.dietary_restrictions}
            onChange={handleChange}
          ></textarea>
          <small className="form-text text-muted">
            This field can be left blank.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="medical_conditions" className="form-label">
            Medical Conditions
          </label>
          <textarea
            name="medical_conditions"
            id="medical_conditions"
            className="form-control"
            maxLength={200}
            value={formData.medical_conditions}
            onChange={handleChange}
          ></textarea>
          <small className="form-text text-muted">
            This field can be left blank.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Register Camper
        </button>
      </form>
      {errorMessages &&
        errorMessages.map((errorMessage, index) => (
          <div key={index} className="alert alert-warning mt-3" role="alert">
            {errorMessage}
          </div>
        ))}
    </div>
  );
}
