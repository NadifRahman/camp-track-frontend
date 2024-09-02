import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

export default function InventoryList() {
  const { jwtToken } = useOutletContext();
  const [inventories, setInventories] = useState([]);
  const [filteredInventories, setFilteredInventories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Apparel',
    'Sport',
    'Technology',
    'Office',
    'Consumable',
    'Other',
  ];

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/inventories`,
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
          setErrorMessage(data.message || 'Failed to fetch inventories');
        } else {
          setInventories(data.inventories);
          setFilteredInventories(data.inventories); // Initialize filteredInventories with all inventories
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, [jwtToken]);

  useEffect(() => {
    let filtered = inventories;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (inventory) => inventory.category === selectedCategory
      );
    }

    filtered = filtered.filter((inventory) =>
      inventory.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setFilteredInventories(filtered);
  }, [searchQuery, selectedCategory, sortOrder, inventories]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

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
      <h2 className="mb-4 text-center">Inventory List</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <button className="btn btn-primary" onClick={handleSortToggle}>
          Toggle Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
        <Link to="/inventory-form">
          <div className="btn btn-secondary ms-2">Add Inventory</div>
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventories.length > 0 ? (
            filteredInventories.map((inventory) => (
              <tr key={inventory._id}>
                <td>
                  <Link to={`/inventory-info/${inventory._id}`}>
                    {inventory.title}
                  </Link>
                </td>
                <td>{inventory.category}</td>
                <td>{inventory.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No inventories found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
