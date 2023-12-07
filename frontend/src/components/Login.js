import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';
import EmployeeDataService from '../services/employee'; // Assuming you have a service to get employee data

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      if (!username || !password) {
        setErrorMessage('Please enter both username and password.');
        return;
      }

      const userResponse = await UserDataService.getUser(username);

      if (userResponse.status === 200) {
        const userData = userResponse.data;
        if (userData.username && userData.password === password) {
          if (userData.role === 'patient') {
            navigate(`/patient/${username}`);
          } else if (userData.role === 'employee') {
            const employeeResponse = await EmployeeDataService.getEmployee(username);
            if (employeeResponse.status === 200) {
              const employeeData = employeeResponse.data;
              if (employeeData.is_manager) {
                navigate('/manager'); // Navigate to manager page if is_manager is true
              } else {
                navigate(`/employee/${username}`);
              }
            } else {
              setErrorMessage('Error fetching employee data.');
            }
          }
        } else {
          setErrorMessage('Incorrect username or password.');
        }
      } else {
        setErrorMessage('Error fetching user data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
