import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Ensure both username and password are provided
    if (!username || !password) {
      console.error('Please enter both username and password.');
      return;
    }
  
    // Send login request to the server
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Check if the login was successful based on your server response
        if (data.success) {
          // Determine the user's role
          const role = data.role;
  
          // Redirect to the corresponding page based on the role
          switch (role) {
            case 'patient':
              navigate('/patient');
              break;
            case 'employee':
              navigate('/employee');
              break;
            default:
              console.error('Unknown role:', role);
          }
        } else {
          // Example: show an error message to the user
          console.error('Login failed. Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };  

  const handleRegister = () => {
    // Navigate to the Register page
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
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
