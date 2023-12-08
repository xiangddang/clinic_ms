import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import PatientDataService from "../../services/patient";

const EditProfile = () => {
  const { username, patientId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    biological_sex: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    emergency_name: "",
    emergency_phone: "",
  });

  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState(false);

  useEffect(() => {
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      setProfileData(response.data);
      setFormData({ ...response.data });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const handleConfirm = async () => {
    try {
      const response = await PatientDataService.updatePatient(patientId, formData);
      if (response.status === 200) {
        setUpdateMessage("Profile updated successfully!");
        setUpdateError(false);
        setProfileData(response.data);
      } else {
        throw new Error("Error updating patient data");
      }
    } catch (error) {
      setUpdateMessage("Failed to update profile. Please try again.");
      setUpdateError(true);
      console.error("Error updating patient data:", error);
    }
  };

  const renderFormControl = (key) => {
    // process special fields
    if (key === 'patient_id' || key === 'username') {
      return null;
    }
  
    // process biological sex selection
    if (key === 'biological_sex') {
      return (
        <Form.Control as="select" name={key} value={formData[key]} onChange={handleChange}>
          <option value="">Select biological sex</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </Form.Control>
      );
    }
  
    return (
      <Form.Control
        type={key.includes("date") ? "date" : "text"}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        placeholder={`Enter ${key.split("_").join(" ")}`}
      />
    );
  };

  return (
    <Container>
      {/* Message */}
      {updateMessage && (
        <Alert variant={updateError ? "danger" : "success"} className="mt-3">
          {updateMessage}
        </Alert>
      )}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mt-4">Edit Profile</h2>
          
          <Form>
          {Object.keys(formData).map((key, index) => {
            if (key !== 'patient_id' && key !== 'username') {
              return (
                <Form.Group controlId={`form${key}`} key={index}>
                  <Form.Label>{key.split("_").join(" ").toUpperCase()}</Form.Label>
                  {renderFormControl(key)}
                </Form.Group>
              );
            }
            return null;
          })}

            {/* Buttons */}
            <div className="text-center">
              <Button variant="primary" type="button" onClick={handleConfirm} className="mr-2">
                Confirm
              </Button>
              <Link to={`/patient/profile/${username}/${patientId}`}>
                <Button variant="secondary" type="button">
                  Back
                </Button>
              </Link>
            </div>
          </Form>

          
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
