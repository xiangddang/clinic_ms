import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeDataService from '../../services/employee';

const EmployeeProfile = () => {
  const { username, employeeId } = useParams();
  const [profileData, setProfileData] = useState(null);

    // Dummy data (replace with actual data from API)
    useEffect(() => {
      fetchEmployeeData(username);
    }, [username]);
  
    const fetchEmployeeData = async (username) => {
      try {
        const response = await EmployeeDataService.getEmployee(username);
        console.log(response.data)
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
    console.log(profileData)

  return (
    <div>
      <h2>Employee Profile</h2>
      {profileData ? (
      <ul>
        <li>Name: {profileData.name}</li>
        <li>Date of Birth: {profileData.date_of_birth}</li>
        <li>Biological Sex: {profileData.sex}</li>
        <li>Specialty Name: {profileData.spe_name}</li>
        <li>Phone: {profileData.phone}</li>
        <li>Address: {profileData.street}, {profileData.city}, {profileData.state}, {profileData.zipcode}</li>
      </ul>
      ) : (
        <p>Loading patient data...</p>
      )}
      <Link to={`/employee/profile/${username}/${employeeId}/edit`} className="btn btn-primary">
        Edit Profile
      </Link>
      <Link to={`/employee/${username}`} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default EmployeeProfile;

