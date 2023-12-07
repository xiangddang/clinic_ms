import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeDataService from '../../services/employee';
import '../shared/navbar.css';

const Employee = () => {
  const { username } = useParams();

  const [appointments, setAppointments] = useState([]);

  const [profileData, setProfileData] = useState(null);

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchEmployeeData(username);
  }, [username]);

  const fetchEmployeeData = async (username) => {
    try {
      const response = await EmployeeDataService.getEmployee(username);
      console.log(response.data)
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }
  const employeeId = profileData ? profileData.emp_id : null;
  console.log(employeeId);

  useEffect(() => {
    // Fetch appointments for today when the component mounts
    fetchAppointmentsForToday();
  }, []);

  const fetchAppointmentsForToday = async () => {
    try {
      // Fetch appointments for today from the backend
      const response = await fetch(`/api/appointments/today`);
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments for today:', error);
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/employee">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/employee">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={`/employee/profile/${username}/${employeeId}`}>
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Section to display today's appointments */}
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Check out your today's schedule here.</Card.Title>
                {appointments.length > 0 ? (
                  <ul>
                    {appointments.map(appointment => (
                      <li key={appointment.id}>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>Patient: 
                          <Link to={`/check_medical_by_pid/${patientId}`}>
                            {appointment.patientName}
                          </Link>
                        </p>
                        {/* Add other appointment details */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments for today.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employee;

