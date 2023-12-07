import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../services/user";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
        // clear error message
        setErrorMessage("");

        // Validate input fields
        if (!username || !email || !password) {
            setErrorMessage("Please fill in all fields."); // update error message
            return;
        }
        const data = {
            "username": username,
            "email": email,
            "password": password
        };

        // Send registration request to the server
        const response = await UserDataService.createUser(data);
        console.log(response)
        // Check response status
        if (response.status === 200) {
            navigate("/");
        } else if (response.status === 400) {
            setErrorMessage("Registration failed: Please check your information."); // update error message
        } else {
            setErrorMessage("Registration failed: Server error.");
        }
    } catch (error) {
        setErrorMessage("Error during registration: " + (error.message || "Unknown error")); // update error message
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mt-4">Register</h2>
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

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email" 
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
              <Button variant="primary" type="button" onClick={handleRegister}>
                Confirm
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;