import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

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
            } else if (data.role === 'employee'){
              navigate(`/employee/${username}`);
            } else if (data.role === 'manager'){
              navigate(`/manager`);
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
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mt-4">Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" 
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="button" onClick={handleLogin} className="mr-2">
                Login
              </Button>
              <Button variant="secondary" type="button" onClick={handleRegister}>
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
