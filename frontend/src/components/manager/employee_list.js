// EmployeeDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Fetch employee details using employeeId
    fetchEmployeeDetails(employeeId);
  }, [employeeId]);

  const fetchEmployeeDetails = async (id) => {
    try {
      // Replace the API endpoint with your actual endpoint
      const response = await fetch(`/api/employees/${employeeId}`);
      const data = await response.json();
      setEmployeeDetails(data); // Update the state with employee details
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      // Replace the API endpoint with your actual endpoint
      await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
      });
      setShowDeleteModal(false);
      // You might want to add logic to refresh the employee list
      // or update the state to remove the deleted employee
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleAddEmployee = async (formData) => {
    try {
      // Replace the API endpoint with your actual endpoint
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // You might want to add logic to refresh the employee list
      // or update the state to include the newly added employee

      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Employee Details</Card.Title>
              {employeeDetails ? (
                <>
                  <p>Name: {employeeDetails.name}</p>
                  <p>Date of Birth: {employeeDetails.dateOfBirth}</p>
                  <p>Biological Sex: {employeeDetails.biologicalSex}</p>
                  <p>Start Date: {employeeDetails.startDate}</p>
                  {/* Add other employee details as needed */}
                  <Button variant="danger" onClick={handleShowDeleteModal}>
                    Delete Employee
                  </Button>
                </>
              ) : (
                <p>Loading employee details...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Employee Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this employee?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add a form for entering new employee details */}
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="formBiologicalSex">
              <Form.Label>Biological Sex</Form.Label>
              <Form.Control as="select">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleAddEmployee(formData)}>
            Confirm Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeDetails;

