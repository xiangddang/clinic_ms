import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PatientDataService from "../../services/patient";

const CheckPrescript = () => {
  const { username, patientId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch appointments for the specific patient
    fetchPrescriptions(patientId);
  }, [patientId]);

  const fetchPrescriptions = async (patientId) => {
    try {
      const response = await PatientDataService.getMedicalRecords(patientId);
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  return (
    <div>
      <h2>Prescription Information</h2>
      <ul>
        {prescriptions.map((prescription) => (
          <div key={prescription.medical_records_no}>
            <p>Date: {prescription.record_date}</p>
            <p>Disease: {prescription.disease}</p>
            <p>Prescription: {prescription.prescriptions}</p>
            <p>Medication: {prescription.medication}</p>
            {/* Add other appointment details */}
            <hr />
          </div>
        ))}
      </ul>
      <Link to={`/patient/${username}`} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default CheckPrescript;
