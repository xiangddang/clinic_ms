import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../shared/navbar.css';

const Manager = () => {
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [recentTotalRevenue, setRecentTotalRevenue] = useState(0); // Set initial value as needed

  // Fetch recent total revenue when the component mounts
  useEffect(() => {
    fetchRecentTotalRevenue();
  }, []);

  const fetchRecentTotalRevenue = async () => {
    try {
      // Replace the API endpoint with your actual endpoint
      const response = await fetch("/api/revenue/recent");
      const data = await response.json();
      setRecentTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error("Error fetching recent total revenue:", error);
    }
  };

  const handleShowRevenueModal = () => setShowRevenueModal(true);
  const handleCloseRevenueModal = () => setShowRevenueModal(false);

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/manager">X Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/manager">
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* First Section: Employee Information */}
      <Container>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Employee Information</Card.Title>
                <Link to="/manager/employee_list">Check Details</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Section: Revenue Information */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Revenue Information</Card.Title>
                <Button onClick={handleShowRevenueModal}>Check Details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Recent Total Revenue Modal */}
      <Modal show={showRevenueModal} onHide={handleCloseRevenueModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recent Total Revenue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Revenue: ${recentTotalRevenue}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRevenueModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Manager;