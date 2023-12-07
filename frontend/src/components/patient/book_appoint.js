import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDataService from "../../services/patient";

const BookAppointment = ({ show, handleClose, patientId }) => {
  console.log(patientId);
  // 状态：可用日期数组
  const [availableSlots, setAvailableSlots] = useState(null);
  // 状态：用户选择的日期和时间
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 在组件挂载时，获取可用日期数据
  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  // 从后端获取可用日期数据的函数
  const fetchAvailableSlots = async () => {
    try {
      // 发送请求到后端获取可用日期数据
      const response = await PatientDataService.getAvailableAppointments();
      // 设置可用日期数组的状态
      setAvailableSlots(response.data);
      console.log(availableSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };
  // 处理用户选择的日期和时间
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  // 处理用户提交预约的逻辑
  const handleAppointmentSubmit = async () => {
    if (selectedSlot && patientId) {
      try {
        const appointmentId = selectedSlot.appointment_no;
        // 向后端发送预约请求
        const response = await PatientDataService.bookAppointment(patientId, appointmentId);
        console.log("Appointment booked successfully:", response.data);

        // 在这里可以添加其他逻辑，例如关闭模态框、刷新数据等
        handleClose();
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    } else {
      console.error("No slot selected.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {availableSlots ? (
          <Form>
            <Form.Group controlId="slotSelect">
              <Form.Label>Select an available slot:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  handleSlotSelection(availableSlots[e.target.value])
                }
              >
                <option value="">Select a slot</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={index}>
                    {`${slot.app_date} - ${slot.app_time} - ${slot.name}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        ) : (
          <p>Loading available slots...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAppointmentSubmit}>
          Book Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookAppointment;
