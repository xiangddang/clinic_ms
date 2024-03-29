import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ManageDataService from "../../services/manage.js";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/manager");
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setError(""); // Reset any existing errors
      const response = await ManageDataService.getAppointments();
      console.log(response.data);
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
      <Button
            onClick={handleBack}
            className="btn btn-secondary" 
            style={{
              padding: "10px 20px",
              width: "auto",
              marginLeft: "10px",
              color: "black",
              marginBottom: "10px",
            }}
          >
            Back
      </Button>
    </Container>
  );
};

export default AppointmentList;
