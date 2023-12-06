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

  return (
    <div>
      <h2>Appointment List</h2>
      {appointments.map(appointment => (
        <div key={appointment.appointmentId}>
          <p>Date: {appointment.date}</p>
          <p>Doctor: {appointment.doctorName}</p>
          {/* Add other appointment details */}
          <hr />
        </div>
      ))}
      <Link to="/patient">Go Back</Link>
    </div>
  );
};

export default AppointmentList;
