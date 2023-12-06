// AppointmentList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AppointmentList = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments for the specific patient
    fetchAppointments(patientId);
  }, [patientId]);

  const fetchAppointments = async (patientId) => {
    try {
      // Fetch appointments for the specific patient from the backend
      const response = await fetch(`/api/appointments/${patientId}`);
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // Send a request to the backend to cancel the appointment
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the state to remove the cancelled appointment
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.appointmentId !== appointmentId)
        );
      } else {
        console.error('Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div>
      <h2>Appointment List</h2>
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId}>
          <p>Date: {appointment.date}</p>
          <p>Doctor: {appointment.doctorName}</p>
          {/* Add other appointment details */}
          <button onClick={() => handleCancelAppointment(appointment.appointmentId)}>
            Cancel
          </button>
          <hr />
        </div>
      ))}
      <Link to="/patient">Go Back</Link>
    </div>
  );
};

export default AppointmentList;
