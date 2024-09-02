import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './bootstrap.min.css';
import Navbar from './components/general/Navbar';
import { useNavigate } from 'react-router-dom';

function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
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
    navigate('/');
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <>
      <Navbar jwtToken={jwtToken} logOut={logOut}></Navbar>
      <Outlet context={{ jwtToken, setToken, logOut }} />

      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1000,
        }}
      >
        &copy; 2024 Nadif Rahman |{' '}
        <a
          href="https://github.com/NadifRahman"
          target="_blank"
          style={{ color: '#ffffff', textDecoration: 'none' }}
        >
          GitHub
        </a>
      </div>
    </>
  );
}

export default App;
