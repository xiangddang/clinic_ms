import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shared/navbar.css";
import BookAppointment from "./book_appoint";

const Patient = () => {
  // 取得available预约时间
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleShowAppointmentModal = () => setShowAppointmentModal(true);
  const handleCloseAppointmentModal = () => setShowAppointmentModal(false);

  // temp patientID
  const patientId = '123';
  const [latestPrescription, setLatestPrescription] = useState(null);

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
      console.error('Error fetching latest prescription:', error);
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="#home">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#schedule">Book a Visit</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
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
                </>
              ) : (
                <p>No prescription available.</p>
              )}
              <Link to={`/check_prescript/${patientId}`}>Check Details</Link>
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
                {/* 在这里添加你想要显示的内容 */}
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
