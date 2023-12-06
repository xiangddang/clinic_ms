import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../services/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Validate input fields (you can add more validation logic)
      if (!username || !email || !password) {
        console.error("Please fill in all fields.");
        return;
      }
      const data = {
        "username": username,
        "email": email,
        "password": password
      }
      console.log(data)
      // Send registration request to the server
      const response = await UserDataService.createUser();
      console.log(response);

      // Check if the registration was successful based on your server response
      if (data && data.success) {
        // Example: navigate to the login page after successful registration
        navigate("/login");
      } else {
        // Example: show an error message to the user
        console.error("Registration failed. Please check your information.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
    </div>
  );
};

export default Register;
