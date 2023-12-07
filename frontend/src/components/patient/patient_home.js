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
  // 取得available预约时间
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
    // 在组件挂载时获取病患的最近一次处方信息
    fetchLatestPrescription(patientId);
  }, [patientId]);

  const fetchLatestPrescription = async (patientId) => {
    try {
      // 发送请求到后端获取病患的最近一次处方信息
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

        {/* 第二个板块：处方信息 */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Prescription Information</Card.Title>
                {/* 根据最近一次处方信息显示数据 */}
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
                  <p>No prescription available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 第三个板块：预约信息 */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Appointment Information</Card.Title>
                {/* 显示最近的一次预约信息 */}
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

        {/* 预约界面 */}
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
