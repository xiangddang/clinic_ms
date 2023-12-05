import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditProfile = () => {
  const { patientId } = useParams();

  // Dummy data (replace with actual data from or API)
  const initialData = {
    name: 'John Doe',
    dob: '01/01/1990',
    sex: 'Male',
    phone: '123-456-7890',
    address: '123 Main St, Cityville',
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirm = () => {
    // Handle form submission (e.g., send data to the backend)
    // For simplicity, we're just logging the form data
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {/* ... (similar input fields for other details) */}
        <Link to={`/patient/profile/${patientId}`}>
          <button type="button" onClick={handleConfirm}>
            Confirm
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
