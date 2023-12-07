import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";

const BillingList = () => {
  const [billings, setBillings] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const fetchBillingData = async () => {
    try {
      setError("");
      console.log(startDate, endDate)
      const response = await ManageDataService.getBillingInfo({ startDate, endDate });

      if (response.status !== 200) {
        throw new Error("Error fetching billing data");
      }

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
        <Button type="submit">Search</Button>
      </Form>
      <Table striped bordered hover className="mt-3">
        {/* Table content as before */}
      </Table>
      {error && <div>Error: {error}</div>}
    </Container>
  );
};

export default BillingList;
