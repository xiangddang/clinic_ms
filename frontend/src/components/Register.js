import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../services/user";

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
            navigate("/login");
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
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Confirm
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}; 

export default Register;
