import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function InventoryForm() {
  const { jwtToken } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Apparel', // default is Apparel
    storage_location: '',
    quantity: '',
    notes: '',
  });
  const [errorMessages, setErrorMessages] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const categories = [
    'Apparel',
    'Sport',
    'Technology',
    'Office',
    'Consumable',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/inventory`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(formData),
          mode: 'cors',
        }
      );

      const data = await response.json();

      if (response.status === 422) {
        setErrorMessages(data.errors); // validation errors
        setSuccessMessage(null);
      } else if (!response.ok) {
        setErrorMessages(['There was an error. Please try again later.']);
        setSuccessMessage(null);
      } else {
        setSuccessMessage('Inventory added successfully!');
        setErrorMessages(null);
        setFormData({
          title: '',
          category: 'Apparel',
          storage_location: '',
          quantity: '',
          notes: '',
        });

        //
        navigate(`/inventory-info/${data.id}`);
      }
    } catch (err) {
      setErrorMessages(['Network error. Please try again later.']);
      setSuccessMessage(null);
      console.error('Error:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Inventory Item</h2>

      {errorMessages &&
        errorMessages.map((errorMessage, index) => (
          <div key={index} className="alert alert-danger">
            {errorMessage}
          </div>
        ))}

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            required
            maxLength={50}
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="storage_location" className="form-label">
            Storage Location
          </label>
          <input
            type="text"
            name="storage_location"
            id="storage_location"
            className="form-control"
            required
            maxLength={50}
            value={formData.storage_location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="form-control"
            required
            min="0"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            className="form-control"
            maxLength={300}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Inventory
        </button>
      </form>
    </div>
  );
}
