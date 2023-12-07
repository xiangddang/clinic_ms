import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import ManageDataService from "../../services/manage.js";
import EmployeeDataService from "../../services/employee.js";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    date_of_birth: "",
    biological_sex: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    role: "",
    email: "",
    spe_name: "",
    startDate: "",
  });
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    fetchAllEmployees();
    fetchAllSpecialties();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      setError("");
      const response = await ManageDataService.getEmployees();

      // Assuming the response is successful, set the employees data
      setEmployees(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      setError(error.message || "Error fetching employees");
    }
  };

  const fetchAllSpecialties = async () => {
    try {
      setError("");
      const response = await EmployeeDataService.getSpecialties();

      // Set the specialties data
      setSpecialties(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      setError(error.message || "Error fetching specialties");
    }
  };
  

  const handleAddEmployee = async () => {
    try {
      setError("");
      console.log(newEmployee);
      const response = await ManageDataService.createEmployee(newEmployee);
      if (response.status !== 200) {
        setError("Error adding employee");
      }
      // reset new employee
      setNewEmployee({
        name: "",
        date_of_birth: "",
        biological_sex: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        role: "",
        email: "",
        spe_name: "",
        start_date: "",
      });
      fetchAllEmployees();
      setShowAddModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteConfirmation = (emp_id) => {
    console.log(emp_id);
    setSelectedEmployee(emp_id);
    setShowDeleteModal(true);
  }

  const handleDeleteEmployee = async () => {
    try {
      if (!selectedEmployee) throw new Error("No employee selected for deletion");
      const response = await ManageDataService.deleteEmployee(selectedEmployee);
      if (response.status !== 200) throw new Error("Error deleting employee");

      fetchAllEmployees();
      setShowDeleteModal(false);
    } catch (error) {
      setError(error.message || "Error processing your request");
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Button onClick={() => setShowAddModal(true)}>
            Add New Employee
          </Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        {employees.map((employee) => (
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
                <p>Role: {employee.is_doctor ? "Doctor" : "Nurse"}</p>
                <p>Biological Sex: {employee.biological_sex}</p>
                <p>Specialty: {employee.spe_name}</p>
                <Button
                  variant="danger"
                  onClick={() => 
                    handleDeleteConfirmation(employee.emp_id)
                  }
                >
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
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    date_of_birth: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, street: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, state: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, zipcode: e.target.value })
                }
              />
            </Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  role: e.target.value,
                })
              }
            >
              <option value="">Select role for the employee</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </Form.Control>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    spe_name: e.target.value,
                  })
                }
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty.spe_name}>
                    {specialty.spe_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Biological Sex</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    biological_sex: e.target.value,
                  })
                }
              >
                <option value="">Select biological sex</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, start_date: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Employee Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeDetails;
