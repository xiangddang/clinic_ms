import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import EmployeeDataService from "../../services/employee";

const EmployeeProfile = () => {
  const { username, employeeId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchEmployeeData(username);
  }, [username]);

  const fetchEmployeeData = async (username) => {
    try {
      const response = await EmployeeDataService.getEmployee(username);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="text-center">
            <Card.Header as="h5">Employee Profile</Card.Header>
            {profileData ? (
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Name:</strong> {profileData.name}</ListGroup.Item>
                  <ListGroup.Item><strong>Date of Birth:</strong> {profileData.date_of_birth}</ListGroup.Item>
                  <ListGroup.Item><strong>Biological Sex:</strong> {profileData.biological_sex}</ListGroup.Item>
                  <ListGroup.Item><strong>Specialty:</strong> {profileData.spe_name}</ListGroup.Item>
                  <ListGroup.Item><strong>Phone:</strong> {profileData.phone}</ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> {profileData.street}, {profileData.city}, {profileData.state}, {profileData.zipcode}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            ) : (
              <Card.Body>Loading employee data...</Card.Body>
            )}
            <Card.Footer>
              <Link to={`/employee/profile/${username}/${employeeId}/edit`} className="btn btn-secondary">
                Edit Profile
              </Link>
              <Link to={`/employee/${username}`} className="btn btn-secondary ml-2">
                Back
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeProfile;
