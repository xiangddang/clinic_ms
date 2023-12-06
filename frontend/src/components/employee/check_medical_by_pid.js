import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CheckMedicalRecord = ({ patientId }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    disease: '',
    diagnosis: '',
    prescription: '',
    medication: '',
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchMedicalRecords = useCallback(async () => {
    try {
      const response = await fetch(`/api/medical-records/${patientId}`);
      const data = await response.json();
      setMedicalRecords(data);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  }, [patientId]);

  const handleAddRecord = async () => {
    try {
      const response = await fetch(`/api/medical-records/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId,
          ...newRecord,
        }),
      });

      if (response.ok) {
        fetchMedicalRecords();
        setNewRecord({
          disease: '',
          diagnosis: '',
          prescription: '',
          medication: '',
        });
        handleCloseModal();
      } else {
        console.error('Failed to add a new medical record');
      }
    } catch (error) {
      console.error('Error adding a new medical record:', error);
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, [patientId, fetchMedicalRecords]);

  return (
    <div>
      <h2>Medical Record</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add New Medical Record
      </Button>

      {/* Display existing medical records */}
      <ul>
        {medicalRecords.map((record) => (
          <li key={record.id}>
            <p>Disease: {record.disease}</p>
            <p>Diagnosis: {record.diagnosis}</p>
            <p>Prescription: {record.prescription}</p>
            <p>Medication: {record.medication}</p>
          </li>
        ))}
      </ul>

      {/* Modal for adding a new medical record */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Medical Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Disease:
            <input
              type="text"
              value={newRecord.disease}
              onChange={(e) => setNewRecord({ ...newRecord, disease: e.target.value })}
            />
          </label>
          <label>Diagnosis:
            <input
              type="text"
              value={newRecord.diagnosis}
              onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
            />
          </label>
          <label>Prescription:
            <input
              type="text"
              value={newRecord.prescription}
              onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
            />
          </label>
          <label>Medication:
            <input
              type="text"
              value={newRecord.medication}
              onChange={(e) => setNewRecord({ ...newRecord, medication: e.target.value })}
            />
          </label>
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
