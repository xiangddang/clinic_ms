import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', dateOfBirth: '', biologicalSex: 'Male', startDate: '' });

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      setError('');
      const response = await ManageDataService.getEmployees();

      if (response.status !== 200) throw new Error('Error fetching employees');
      const data = await response.data;
      console.log(data);
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddEmployee = async () => {
    try {
      setError('');
      const response = await ManageDataService.createEmployee(newEmployee);
      if (response.status !== 200) throw new Error('Error creating employee');
      fetchAllEmployees();
      setShowAddModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      setError('');
      const response = await fetch(`/api/employees/${selectedEmployee}`, { method: "DELETE" });
      if (response.status !== 200) throw new Error('Error deleting employee');
      fetchAllEmployees();
      setShowDeleteModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Button onClick={() => setShowAddModal(true)}>Add New Employee</Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        {employees.map(employee => (
          <Col key={employee.emp_id} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <p>Date of Birth: {employee.date_of_birth}</p>
                <p>Phone: {employee.phone}</p>
                <p>Street: {employee.street}</p>
                <p>State: {employee.state}</p>
                <p>Zipcode: {employee.zipcode}</p>
                <p>Start date: {employee.start_date}</p>
                <p>Role: {employee.is_doctor ? "Doctor": "Nurse"}</p>
                <p>Biological Sex: {employee.biologicalSex}</p>
                <p>Specialty: {employee.spe_name}</p>
                <Button variant="danger" onClick={() => { setSelectedEmployee(employee.id); setShowDeleteModal(true); }}>
                  Delete Employee
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirth: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Biological Sex</Form.Label>
              <Form.Control as="select" onChange={(e) => setNewEmployee({ ...newEmployee, biologicalSex: e.target.value })}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddEmployee}>Add Employee</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Employee Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeDetails;

