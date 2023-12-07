// AppointmentList.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PatientDataService from "../../services/patient";

const AppointmentList = () => {
  const { username, patientId } = useParams();
  const [appointments, setAppointments] = useState([]);

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

      if (response.ok) {
        // Update the state to remove the cancelled appointment
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.appointment_no !== appointmentId
          )
        );
      } else {
        console.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div>
      <h2>Appointment List</h2>
      <Link to={`/patient/${username}`} className="btn btn-primary">
        Back
      </Link>
      {appointments.map((appointment) => (
        <div key={appointment.appointment_no}>
          <p>Date: {appointment.app_date}</p>
          <p>Time: {appointment.app_time}</p>
          <p>Doctor: {appointment.doctor_ame}</p>
          {/* Add other appointment details */}
          <button
            onClick={() => handleCancelAppointment(appointment.appointment_no)}
          >
            Cancel Appointment
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
