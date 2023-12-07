import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
      console.log("Profile updated successfully:", response.data);
      setProfileData(response.data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mt-4">Edit Profile</h2>
          
          <Form>
            {/* Form Fields */}
            {Object.keys(formData).map((key, index) => (
              <Form.Group controlId={`form${key}`} key={index}>
                <Form.Label>{key.split("_").join(" ").toUpperCase()}</Form.Label>
                <Form.Control
                  type={key.includes("date") ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                />
              </Form.Group>
            ))}

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

          {/* Success Message */}
          {updateSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              Profile updated successfully!
            </div>
          )}
          
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
