import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async() => {
    // Ensure both username and password are provided
    try {
      if (!username || !password) {
        console.error('Please enter both username and password.');
        return;
      }
      
      const response = await UserDataService.getUser(username);
      
      if (response.status === 200) {
        const data = response.data;
        if (data.username === username && data.password === password) {
          if (data.role === 'patient') {
            navigate('/patient/${username}')
          } else {
            navigate('/employee/${username}')
          }
        }
      } else {
        console.error('Error fetching user data:', response.statusText)
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
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
