import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PatientDataService from "../../services/patient";

const EditProfile = () => {
  const { username, patientId } = useParams();
  console.log(username);
  console.log(patientId);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    sex: "",
    phone: "",
    address: "",
  });

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      console.log(response.data);
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
        emergency_name: response.data.emergency_name,
        emergency_phone: response.data.emergency_phone,
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  console.log(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirm = async () => {
    try {
      // Update patient data in the backend
      const response = await PatientDataService.updatePatient(
        patientId,
        formData
      );
      console.log("Profile updated successfully:", response.data);

      // Optionally, you can update the local state with the new data
      setProfileData(response.data);
    } catch (error) {
      console.error("Error updating patient data:", error);
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
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Biological Sex:
          <input
            type="text"
            name="biological_sex"
            value={formData.biological_sex}
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
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Emergency name:
          <input
            type="text"
            name="emergency_name"
            value={formData.emergency_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Emergency phone:
          <input
            type="text"
            name="emergency_phone"
            value={formData.emergency_phone}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Link to go back to the profile page */}
        <Link to={`/patient/profile/${username}/${patientId}`}>
          {/* Confirm button */}
          <button type="button" onClick={handleConfirm}>
            Confirm
          </button>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
