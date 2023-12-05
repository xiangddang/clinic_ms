import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Validate input fields (you can add more validation logic)
    if (!username || !email || !password) {
      console.error('Please fill in all fields.');
      return;
    }

    // Send registration request to the server
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 数据需要添加到数据库
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        // Check if the registration was successful based on your server response
        if (data.success) {
          // Example: navigate to the login page after successful registration
          navigate('/login');
        } else {
          // Example: show an error message to the user
          console.error('Registration failed. Please check your information.');
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Register;
