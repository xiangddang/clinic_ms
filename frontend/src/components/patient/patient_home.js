import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shared/navbar.css";
import BookAppointment from "./book_appoint";
import PatientDataService from "../../services/patient";

const Patient = () => {
  const { username } = useParams();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);


  const handleShowAppointmentModal = () => setShowAppointmentModal(true);
  const handleCloseAppointmentModal = () => setShowAppointmentModal(false);

  const [profileData, setProfileData] = useState(null);

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  const patientId = profileData ? profileData.patient_id : null;
  console.log(patientId);

  const [latestPrescription, setLatestPrescription] = useState(null);

  useEffect(() => {
    // Fetch the latest prescription when the component mounts
    fetchLatestPrescription(patientId);

    const intervalId = setInterval(() => {
      fetchLatestPrescription(patientId);
    }, 10000); 
        
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [patientId]);

  const fetchLatestPrescription = async (patientId) => {
    try {

      const response = await PatientDataService.getMedicalRecords(patientId);
      const prescriptions = response.data;

      if (prescriptions.length > 0) {
        const latestPrescription = {
          md_id: prescriptions[0].medical_records_no,
          record_date: prescriptions[0].record_date,
          disease: prescriptions[0].disease,
          medication: prescriptions[0].medication,
          prescription: prescriptions[0].prescriptions,
        };
        setLatestPrescription(latestPrescription);
      } else {
        setLatestPrescription(null);
      }
    } catch (error) {
      console.error("Error fetching latest prescription:", error);
    }
  };

  const [latestAppointment, setLatestAppointment] = useState(null);

  useEffect(() => {
    // Fetch the latest appointment when the component mounts
    fetchLatestAppointment(patientId);
      // Set up an interval to fetch the latest appointment every 10 minutes
    const intervalId = setInterval(() => {
    fetchLatestAppointment(patientId);
  }, 10000); // 600000 milliseconds = 10 minutes

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
  }, [patientId]);

  const fetchLatestAppointment = async (patientId) => {
    try {
      // Fetch the latest appointment for the specific patient
      const response = await PatientDataService.getAppointmentPatient(
        patientId
      );
      const appointments = response.data;

      if (appointments.length > 0) {
        const latestAppointment = appointments[appointments.length - 1];
        setLatestAppointment(latestAppointment);
      } else {
        setLatestAppointment(null);
      }
    } catch (error) {
      console.error("Error fetching latest appointment:", error);
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/patient">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={`/patient/${username}`}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={`/patient/profile/${username}/${patientId}`}
            >
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* First Section: Book Appointment */}
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Book a Visit</Card.Title>
                <Button onClick={handleShowAppointmentModal}>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Prescription Information</Card.Title>
                <Card.Title>Medical Record Information</Card.Title>
                {latestPrescription ? (
                  <>
                    <p>Date: {latestPrescription.record_date}</p>
                    <p>Disease: {latestPrescription.disease}</p>
                    <p>Medication: {latestPrescription.medication}</p>
                    <p>Prescription: {latestPrescription.prescription}</p>
                    <Link to={`/patient/check_prescript/${patientId}`}>
                      Check Details
                    </Link>
                  </>
                ) : (
                  <p>No medical record available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Appointment Information</Card.Title>
                {latestAppointment ? (
                  <>
                    <p>Date: {latestAppointment.app_date}</p>
                    <p>Time: {latestAppointment.app_time}</p>
                    <p>Doctor: {latestAppointment.doctor_name}</p>
                    {/* Add other appointment details */}
                    <Link to={`/patient/check_apps/${patientId}`}>
                      Check Details
                    </Link>
                  </>
                ) : (
                  <p>No appointment available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <BookAppointment
          show={showAppointmentModal}
          handleClose={handleCloseAppointmentModal}
          patientId={patientId}
        />
      </Container>
    </div>
  );
};

export default Patient;
