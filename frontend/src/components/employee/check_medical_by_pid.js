import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import PatientDataService from "../../services/patient.js";
import EmployeeDataService from "../../services/employee.js";
import Table from "react-bootstrap/Table";

const CheckMedicalRecord = () => {
  const { patientId, doctorId } = useParams();

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [diseases, setDiseases] = useState([]);
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState("");
  const [newRecord, setNewRecord] = useState({
    disease: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchAllDiseases = async () => {
    try {
      setError("");
      const response = await EmployeeDataService.getDiseases();

      // Set the specialties data
      setDiseases(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      setError(error.message || "Error fetching specialties");
    }
  };

  const fetchAllMedications = async () => {
    try {
      setError("");
      const response = await EmployeeDataService.getMedications();

      // Set the specialties data
      setMedications(response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      setError(error.message || "Error fetching specialties");
    }
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
    fetchAllDiseases();
    fetchAllMedications();
  }, [patientId, fetchMedicalRecords]);

  const handleAddRecord = async () => {
    try {
      const response = await EmployeeDataService.createCompleteMedicalRecord(patientId, doctorId, newRecord);
      // Fetch updated medical records after adding
      if (response.status !== 200) {
        throw new Error("Error adding medical record, diagnosis, or prescription");
      }
      await fetchMedicalRecords();
      setNewRecord({
        disease: "",
        medication: "",
        dosage: "",
        frequency: "",
        duration: "",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error in adding medical record, diagnosis, or prescription:", error);
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, [patientId, fetchMedicalRecords]);

  return (
    <div className="medical-record-container">
      <h2>Medical Record</h2>
      <p>{error}</p>
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

      <Button variant="primary" onClick={handleShowModal}>
        Add New Medical Record
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Medical Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    disease: e.target.value,
                  })
                }
              >
                <option value="">Select Disease</option>
                {diseases.map((disease, index) => (
                  <option key={index} value={disease.dis_name}>
                    {disease.dis_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Medication</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    medication: e.target.value,
                  })
                }
              >
                <option value="">Select Mediacation</option>
                {medications.map((medication, index) => (
                  <option key={index} value={medication.medication_name}>
                    {medication.medication_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Dosage</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.dosage}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, dosage: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.frequency}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, frequency: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="int"
                unit="days"
                value={newRecord.duration}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, duration: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecord}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckMedicalRecord;
