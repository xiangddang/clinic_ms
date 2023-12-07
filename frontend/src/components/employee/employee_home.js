import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeDataService from '../../services/employee';
import '../shared/navbar.css';

const Employee = () => {
  const { username } = useParams();

  const [appointments, setAppointments] = useState([]);

  const [employeeId, setEmoloyeeId] = useState(null);

  const [role, setRole] = useState('');

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchEmployeeData(username);
  }, [username]);

  const fetchEmployeeData = async (username) => {
    try {
      const response = await EmployeeDataService.getEmployee(username);

      if (response.status !== 200) {
        throw new Error('Failed to fetch employee data');
      }


      setEmoloyeeId(response.data.emp_id);
      if (response.data.is_doctor === 1) {
        setRole('doctor');
      } else {
        setRole('nurse');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  console.log(employeeId);

  useEffect(() => {
    // Fetch appointments for today when the component mounts
    fetchAppointmentsForToday();
  }, [employeeId]);

  const fetchAppointmentsForToday = async () => {
    try {
      // Ensure employeeId is available before making the request
      if (!employeeId) return;
  
      // Fetch appointments for today from the backend
      const response = await EmployeeDataService.getAppointmentEmployee(employeeId);
      console.log(response.data)
      if (response.status !== 200) {
        throw new Error('Failed to fetch appointments');
      }
  
      // Assuming response.data contains the appointments array
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments for today:', error);
      setAppointments([]); // Set to empty array in case of error
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/employee">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={`/employee/${username}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={`/employee/profile/${username}/${employeeId}`}>
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Logout
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
                <Card.Title>Today's Schedule</Card.Title>
                {appointments.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(appointment => (
                        <tr key={appointment.appointment_no}>
                          <td>{appointment.app_date}</td>
                          <td>{appointment.app_time}</td>
                          <td>
                            { 
                              role === 'doctor' ? (
                                <Link to={`/employee/check_medical_rec/${appointment.patient_id}/${employeeId}`}>
                              {appointment.name}
                            </Link>
                              ) : (
                                <Link to={`/patient/check_prescript/${appointment.patient_id}`}>
                                  {appointment.name}
                                </Link>
                              )
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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

