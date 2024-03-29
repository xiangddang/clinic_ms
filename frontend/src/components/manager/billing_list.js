import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";
import { useNavigate } from "react-router-dom";

const BillingList = () => {
  const [billings, setBillings] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/manager");
  };

  const fetchBillingData = async () => {
    try {
      setError("");

      if (!startDate || !endDate) {
        throw new Error("Please select both start and end dates.");
      }

      const data = {
        "start_date": startDate,
        "end_date": endDate
      }
      
      const response = await ManageDataService.getBillingInfo(data);
      if (response.status !== 200) {
        throw new Error("Error fetching billing data");
      }
      console.log(response.data)
      setBillings(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch billing data");
    }
  };

  // Call this function when the form is submitted
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchBillingData();
  };

  return (
    <Container>
      <h2>Billing List</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-secondary" style={{ marginTop: '20px', color: "black"}}>Search</Button>
      </Form>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Service Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((billing, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{billing.patient_name}</td>
              <td>{billing.created_date}</td>
              <td>{billing.amount}</td>
              <td>{billing.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <div>Error: {error}</div>}
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
    </Container>
  );
};

export default BillingList;
