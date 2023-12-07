import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetchPatients();
  }, []);

  const handleBack = () => {
    navigate("/manager");
  };

  const fetchPatients = async () => {
    try {
      setError(""); // Reset any existing errors
      const response = await ManageDataService.getPatients();
    console.log(response.data)
      if (response.status !== 200) {
        throw new Error("Error fetching patients");
      }

      setPatients(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch patients");
    }
  };

  return (
    <Container>
      <h2>Patients List</h2>
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Emergency Name</th>
            <th>Emergency Phone</th>
            <th>Biological Sex</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.phone}</td>
              <td>{patient.street}</td>
              <td>{patient.city}</td>
              <td>{patient.state}</td>
              <td>{patient.zipcode}</td>
              <td>{patient.emergency_name}</td>
              <td>{patient.emergency_phone}</td>
              <td>{patient.biological_sex}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
            onClick={handleBack}
            className="btn btn-secondary" 
            style={{
              padding: "10px 20px",
              width: "auto",
              marginLeft: "10px",
              color: "black",
              marginBottom: "10px",
            }}
          >
            Back
      </Button>
      {error && <div>Error: {error}</div>}
    </Container>
    
  );
};

export default PatientList;
