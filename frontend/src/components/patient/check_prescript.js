import React, { useState, useEffect } from 'react';

const CheckPrescript = ({ patientId }) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(`/api/prescriptions/${patientId}`);
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  return (
    <div>
      <h2>Prescription Information</h2>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>

            {prescription.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckPrescript;

