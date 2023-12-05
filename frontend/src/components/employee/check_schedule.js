import React, { useState, useEffect } from 'react';

const CheckSchedule = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint for fetching appointments
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  };

  return (
    <div>
      <h2>Check Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Appointment Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.doctor_id}</td>
              <td>{appointment.appointment_date}</td>
              {/* Add more cells for additional columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckSchedule;