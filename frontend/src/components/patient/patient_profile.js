import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PatientDataService from '../../services/patient';

const PatientProfile = () => {
  const { username, patientId } = useParams();
  const [profileData, setProfileData] = useState(null);

  // Dummy data (replace with actual data from API)
  useEffect(() => {
    fetchPatientData(username);
  }, [username]);

  const fetchPatientData = async (username) => {
    try {
      const response = await PatientDataService.getPatient(username);
      console.log(response.data)
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }
  console.log(profileData)

  return (
    <div>
      <h2>Patient Profile</h2>
      {profileData ? (
        <ul>
          <li>Name: {profileData.name}</li>
          <li>Date of Birth: {profileData.date_of_birth}</li>
          <li>Biological Sex: {profileData.biological_sex}</li>
          <li>Phone: {profileData.phone}</li>
          <li>Address: {profileData.street}, {profileData.city}, {profileData.state}, {profileData.zipcode}</li>
        </ul>
      ) : (
        <p>Loading patient data...</p>
      )}
      <Link to={`/patient/profile/${patientId}/edit`} className="btn btn-primary">
        Edit Profile
      </Link>
    </div>
  );
};

export default PatientProfile;

