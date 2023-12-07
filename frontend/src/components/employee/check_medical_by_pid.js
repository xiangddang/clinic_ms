import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import PatientDataService from '../../services/patient.js';

const CheckMedicalRecord = () => {
  const { patientId } = useParams();

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [medications, setMedications] = useState([]);
  const [newRecord, setNewRecord] = useState({
    disease: '',
    diagnosis: '',
    prescription: '',
    medication: '',
  });


  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Define fetchMedicalRecords using useCallback
  const fetchMedicalRecords = useCallback(async () => {
    try {
      console.log(patientId);
      const response = await PatientDataService.getMedicalRecords(patientId);
      if (response.status !== 200) {
        throw new Error('Error fetching medical records');
      }
      setMedicalRecords(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  }, [patientId]);

  // Use useEffect to call fetchMedicalRecords when the component mounts or patientId changes
  useEffect(() => {
    if (patientId) {
      fetchMedicalRecords();
    }
  }, [patientId, fetchMedicalRecords]);

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
    <div className="medical-record-container">
      <h2>Medical Record</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add New Medical Record
      </Button>

      {/* Display existing medical records */}
      <ul>
        {/* existing records display */}
      </ul>

      {/* Modal for adding a new medical record */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Medical Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Disease</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.disease}
                onChange={(e) => setNewRecord({ ...newRecord, disease: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.diagnosis}
                onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prescription</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.prescription}
                onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medication</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.medication}
                onChange={(e) => setNewRecord({ ...newRecord, medication: e.target.value })}
              />
            </Form.Group>
            {/* Add additional form groups for medication dosage, frequency, and duration as needed */}
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
