import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import EmployeeDataService from "../../services/employee";

const EditProfile = () => {
  const { username, employeeId } = useParams();
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
    spe_name: "",
  });
  const [specialties, setSpecialties] = useState([]);

  const [statusMessage, setStatusMessage] = useState('');

  const fetchAllSpecialties = async () => {
    try {
      const response = await EmployeeDataService.getSpecialties();

      // Set the specialties data
      setSpecialties(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.log(error);
    }
  };

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchEmployeeData(username);
  }, [username]);

  useEffect(() => {
    fetchAllSpecialties();
  }, []);

  const fetchEmployeeData = async (username) => {
    try {
      const response = await EmployeeDataService.getEmployee(username);
      setProfileData(response.data);
      // Set initial form data
      setFormData({
        name: response.data.name,
        date_of_birth: response.data.date_of_birth,
        biological_sex: response.data.biological_sex,
        phone: response.data.phone,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zipcode: response.data.zipcode,
        spe_name: response.data.spe_name,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // Update patient data in the backend
      const response = await EmployeeDataService.updateEmployee(
        employeeId,
        formData
      );
      if (response.status === 200) {
        // 如果更新成功，导航到员工资料页面
        setStatusMessage("Profile updated successfully.");
        setProfileData(formData);
      } else {
        throw new Error("Error updating employee data");
      }
      // Optionally, you can update the local state with the new data
      setProfileData(formData);
    } catch (error) {
      setStatusMessage("Failed to update profile.");
      console.error("Error updating employee data:", error);
    }
  };


  return (
    <Container>
      {statusMessage && <Alert variant={statusMessage.includes("successfully") ? "success" : "danger"}>
        {statusMessage}
      </Alert>}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Edit Profile</h2>
          <Form>
            {/* Name Field */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            {/* Date of Birth Field */}
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Biological Sex Field */}
            <Form.Group controlId="formBiologicalSex">
              <Form.Label>Biological Sex</Form.Label>
              <Form.Control
                as="select"
                name="biological_sex"
                value={formData.biological_sex}
                onChange={handleChange}
              >
                <option value="">Select biological sex</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Form.Control>
            </Form.Group>

            {/* Phone Field */}
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            {/* Address Fields */}
            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State(2 char)</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </Form.Group>

            <Form.Group controlId="formZipcode">
              <Form.Label>Zipcode(5 number)</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="Enter zipcode"
              />
            </Form.Group>

            {/* Specialty Field */}
            <Form.Group controlId="formSpecialty">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                as="select"
                name="spe_name"
                value={formData.spe_name}
                onChange={handleChange}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty.spe_name}>
                    {specialty.spe_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Submit and Cancel Buttons */}
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
            <Link to={`/employee/profile/${username}/${employeeId}`}>
              <Button variant="secondary" type="button" className="ml-2">
                Back
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
