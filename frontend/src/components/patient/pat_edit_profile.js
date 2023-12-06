import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PatientDataService from '../../services/patient';

const EditProfile = () => {
  const { username, patientId } = useParams();
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch patient data when the component mounts
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      setProfileData(response.data);

      // Set initial form data
      setFormData({
        name: response.data.name,
        dob: response.data.date_of_birth,
        sex: response.data.biological_sex,
        phone: response.data.phone,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zipcode: response.data.zipcode,
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirm = async () => {
    try {
      // Update patient data in the backend
      const response = await PatientDataService.updatePatient(patientId, formData);
      console.log('Profile updated successfully:', response.data);

      // Optionally, you can update the local state with the new data
      setProfileData(response.data);
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Biological Sex:
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            name="address"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <br />
      {/* Add more form inputs as needed */}

      {/* Confirm button */}
      <button type="button" onClick={handleConfirm}>
        Confirm
      </button>

      {/* Link to go back to the profile page */}
      <Link to={`/patient/profile/${username}/${patientId}`}>
        <button type="button">Cancel</button>
      </Link>
      </form>
    </div>
  );
};

export default EditProfile;
