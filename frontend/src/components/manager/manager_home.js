import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../shared/navbar.css';

const Manager = () => {

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
            <Nav.Link as={Link} to="/">
              Log Out
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

        {/* Second Section: Appointment Information */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Appointment Information</Card.Title>
                <Link to="/manager/app_list">Check Details</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

         {/* Third Section: Appointment Information */}
         <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Patient Information</Card.Title>
                <Link to="/manager/patient_list">Check Details</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      

      {/* Fouth Section: Appointment Information */}
      <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Billing Information</Card.Title>
                <Link to="/manager/bill_list">Check Details</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Manager;