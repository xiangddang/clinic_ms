// AppointmentList.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PatientDataService from "../../services/patient";
import { Modal, Button } from "react-bootstrap";

const AppointmentList = () => {
  const { patientId } = useParams();
  const [appointments, setAppointments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  // Function to handle back action
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    // Fetch appointments for the specific patient
    fetchAppointments(patientId);
  }, [patientId]);

  const fetchAppointments = async (patientId) => {
    try {
      // Fetch appointments for the specific patient from the backend
      const response = await PatientDataService.getAppointmentPatient(
        patientId
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // Send a request to the backend to cancel the appointment
      const response = await PatientDataService.cancelAppointment(
        patientId,
        appointmentId
      );

      if (response.status === 200) {
        // Update the state to remove the cancelled appointment
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.appointment_no !== appointmentId
          )
        );
        setModalMessage('Appointment cancelled successfully.');
        setShowModal(true);
      } else {
        console.error("Failed to cancel appointment");
        const errorData = await response.json();
        setModalMessage(errorData.message || 'Failed to cancel appointment');
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setModalMessage('Error cancelling appointment. Please try again later.');
      setShowModal(true);
    }
  };

  return (
    <div>
      <h2>Appointment List</h2>
      <Button onClick={handleBack} className="mb-3">Back</Button> {/* Back button */}
      {appointments.map((appointment) => (
        <div key={appointment.appointment_no}>
          <p>Date: {appointment.app_date}</p>
          <p>Time: {appointment.app_time}</p>
          <p>Doctor: {appointment.doctor_name}</p>
          <button
            onClick={() => handleCancelAppointment(appointment.appointment_no)}
          >
            Cancel Appointment
          </button>
          <hr />
        </div>
      ))}
      {/* Modal for displaying messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppointmentList;
