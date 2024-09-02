import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './bootstrap.min.css';
import Navbar from './components/general/Navbar';

function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedFromStorage = localStorage.getItem('jwtToken');
    setJwtToken(fetchedFromStorage);
    setLoading(false); // Set loading to false after token is fetched
  }, []);

  function setToken(token) {
    localStorage.setItem('jwtToken', token);
    setJwtToken(token);
  }

  function logOut() {
    localStorage.removeItem('jwtToken');
    setJwtToken(null);
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <>
      <Navbar jwtToken={jwtToken} logOut={logOut}></Navbar>
      <Outlet context={{ jwtToken, setToken, logOut }} />
    </>
  );
}

export default App;
