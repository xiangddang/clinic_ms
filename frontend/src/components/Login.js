import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(''); // Clear any existing error messages
    try {
      if (!username || !password) {
        setErrorMessage('Please enter both username and password.'); // Set error message
        return;
      }

      const response = await UserDataService.getUser(username);

      if (response.status === 200) {
        const data = response.data;
        if (data.username) {
          if (data.password === password) {
            if (data.role === 'patient') {
              navigate(`/patient/${username}`);
            } else {
              navigate(`/employee/${username}`);
            }
          } else {
            setErrorMessage('Incorrect password.'); // Set error message for incorrect password
          }
        } else {
          setErrorMessage('Username does not exist.'); // Set error message for non-existent username
        }
      } else {
        setErrorMessage('Error fetching user data.'); // Set a generic error message
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message); // Set error message for exceptions
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Display error message */}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
