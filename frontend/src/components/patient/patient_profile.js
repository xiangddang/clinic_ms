import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import PatientDataService from '../../services/patient';

const PatientProfile = () => {
  const { username, patientId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mt-4">Patient Profile</h2>
          {profileData ? (
            <ListGroup className="mb-3">
              <ListGroup.Item>Name: {profileData.name}</ListGroup.Item>
              <ListGroup.Item>Date of Birth: {profileData.date_of_birth}</ListGroup.Item>
              <ListGroup.Item>Biological Sex: {profileData.biological_sex}</ListGroup.Item>
              <ListGroup.Item>Phone: {profileData.phone}</ListGroup.Item>
              <ListGroup.Item>Address: {profileData.street}, {profileData.city}, {profileData.state}, {profileData.zipcode}</ListGroup.Item>
            </ListGroup>
          ) : (
            <p>Loading patient data...</p>
          )}
          <div className="text-center">
            <Link to={`/patient/profile/${username}/${patientId}/edit`}>
              <Button variant="secondary" className="mr-2">Edit Profile</Button>
            </Link>
            <Link to={`/patient/${username}`}>
              <Button variant="secondary">Back</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientProfile;
