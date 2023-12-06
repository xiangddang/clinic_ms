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
import PatientDataService from '../../services/patient';

const Patient = () => {
  const { username } = useParams();
  // 取得available预约时间
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleShowAppointmentModal = () => setShowAppointmentModal(true);
  const handleCloseAppointmentModal = () => setShowAppointmentModal(false);

  // temp patientID
  const patientId = PatientDataService.getPatient(username);
  const [latestPrescription, setLatestPrescription] = useState(null);
  const [latestAppointment, setLatestAppointment] = useState(null);

  useEffect(() => {
    // 在组件挂载时获取病患的最近一次处方信息
    fetchLatestPrescription(patientId);
  }, [patientId]);

  const fetchLatestPrescription = async (patientId) => {
    try {
      // 发送请求到后端获取病患的最近一次处方信息
      const response = await fetch(`/api/prescription/${patientId}/latest`);
      const data = await response.json();
      // 设置最近一次处方信息的状态
      setLatestPrescription(data.latestPrescription);
    } catch (error) {
      console.error("Error fetching latest prescription:", error);
    }
  };

  useEffect(() => {
    // Fetch the latest appointment when the component mounts
    fetchLatestAppointment(patientId);
  }, [patientId]);
  
  const fetchLatestAppointment = async (patientId) => {
    try {
      // Fetch the latest appointment for the specific patient
      const response = await fetch(`/api/appointments/${patientId}/latest`);
      const data = await response.json();
      setLatestAppointment(data.latestAppointment);
    } catch (error) {
      console.error('Error fetching latest appointment:', error);
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/patient">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/patient">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={`/patient/profile/${patientId}`}>
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 第一个板块：预约界面 */}
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
                    <p>Date: {latestPrescription.date}</p>
                    <p>Medication: {latestPrescription.medication}</p>
                    <p>Dosage: {latestPrescription.dosage}</p>
                    {/* 其他处方信息 */}
                    <Link to={`/check_prescript/${patientId}`}>Check Details</Link>
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
                    <p>Date: {latestAppointment.date}</p>
                    <p>Doctor: {latestAppointment.doctorName}</p>
                    {/* Add other appointment details */}
                    <Link to={`/appointment_list/${patientId}`}>
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
        />
      </Container>
    </div>
  );
};

export default Patient;
