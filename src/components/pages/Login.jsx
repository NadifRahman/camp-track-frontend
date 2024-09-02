import React, { useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import loginStyle from './login.module.css';

export default function Login() {
  const { setToken } = useOutletContext();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/users/log-in`,
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

      if (response.status === 401 || response.status === 404) {
        setErrorMessages([data.message]);
      } else if (response.status === 422) {
        setErrorMessages(data.errors);
      } else if (!response.ok) {
        setErrorMessages(['There was some error, please try again later']);
      } else {
        setErrorMessages(null);
        setToken(data.token);
        navigate('/');
      }
    } catch (err) {
      setErrorMessages(['There is a network error, please try again later']);
      console.error('Error:', err);
    }
  };

  return (
    <div className={`${loginStyle.container} container-sm mt-3 shadow`}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            required
            maxLength={15}
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            maxLength={20}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <small>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
            <div>
              For demo purposes, you may use Username: demo and Password: demo
            </div>
          </small>

          <button
            type="submit"
            className={`${loginStyle.button} btn btn-primary btn-sm`}
          >
            Log in
          </button>
        </div>
      </form>
      {errorMessages &&
        errorMessages.map((errorMessage, index) => (
          <div key={index} className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        ))}
    </div>
  );
}
