import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PatientDataService from "../../services/patient.js";
import Table from "react-bootstrap/Table";

const CheckPrescript  = () => {
  const { patientId} = useParams();

  const [medicalRecords, setMedicalRecords] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle back action
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  
  // Define fetchMedicalRecords using useCallback
  const fetchMedicalRecords = useCallback(async () => {
    try {
      console.log(patientId);
      const response = await PatientDataService.getMedicalRecords(patientId);
      if (response.status !== 200) {
        throw new Error("Error fetching medical records");
      }
      setMedicalRecords(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  }, [patientId]);

  // Use useEffect to call fetchMedicalRecords when the component mounts or patientId changes
  useEffect(() => {
    if (patientId) {
      fetchMedicalRecords();
    }
  }, [patientId, fetchMedicalRecords]);


  useEffect(() => {
    fetchMedicalRecords();
  }, [patientId, fetchMedicalRecords]);

  return (
    <div className="medical-record-container">
      <h2>Medical Record</h2>
      <Button onClick={handleBack} className="mb-3">Back</Button> {/* Back button */}
      {medicalRecords.length > 0 ? (
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Disease</th>
            <th>Medication</th>
            <th>Prescriptions</th>
            <th>Record Date</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.medical_records_no}</td>
              <td>{record.disease}</td>
              <td>{record.medication}</td>
              <td>{record.prescriptions}</td>
              <td>{new Date(record.record_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p className="mt-3">No medical records found.</p>
    )}

    </div>
  );
};

export default CheckPrescript;
