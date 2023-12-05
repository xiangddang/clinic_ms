import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PatientProfile = () => {
  const { patientId } = useParams();

  // Dummy data (replace with actual data from API)
  const profileData = {
    name: 'John Doe',
    dob: '01/01/1990',
    sex: 'Male',
    phone: '123-456-7890',
    address: '123 Main St, Cityville',
  };

  return (
    <div>
      <h2>Patient Profile</h2>
      <ul>
        <li>Name: {profileData.name}</li>
        <li>Date of Birth: {profileData.dob}</li>
        <li>Biological Sex: {profileData.sex}</li>
        <li>Phone: {profileData.phone}</li>
        <li>Address: {profileData.address}</li>
      </ul>
      <Link to={`/patient/profile/${patientId}/edit`} className="btn btn-primary">
        Edit Profile
      </Link>
    </div>
  );
};

export default PatientProfile;

