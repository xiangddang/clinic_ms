import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setError(""); // Reset any existing errors
      const response = await ManageDataService.getAppointments();
        console.log(response.data)
      if (response.status !== 200) {
        throw new Error("Error fetching appointments");
      }

      setAppointments(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch appointments");
    }
  };

  return (
    <Container>
      <h2>Appointments List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Appointment Time</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.app_date + " " + appointment.app_time}</td>
              <td>{appointment.doctor_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AppointmentList;
