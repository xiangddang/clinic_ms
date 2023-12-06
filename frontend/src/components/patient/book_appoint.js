import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookAppointment = ({ show, handleClose }) => {
  // 状态：可用日期数组
  const [availableSlots, setAvailableSlots] = useState([]);
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
      const response = await fetch("/api/available-slots");
      const data = await response.json();
      // 设置可用日期数组的状态
      setAvailableSlots(data.availableSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  // 处理确认按钮点击事件
  const handleConfirm = () => {
    // 处理确认逻辑，可以将选定的slot传递给后端进行处理
    console.log("Confirmed:", selectedSlot);
    // 关闭模态框
    handleClose();
  };

  // 处理取消按钮点击事件
  const handleCancel = () => {
    // 处理取消逻辑
    console.log("Cancelled");
    // 关闭模态框
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 选择日期和时间 */}
        <Form.Group controlId="formDateTime">
          <Form.Label>Select Date and Time</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedSlot(e.target.value)}
          >
            <option value="">Select a date and time</option>
            {/* 渲染可用日期和时间选项 */}
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {/* 取消按钮 */}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        {/* 确认按钮，只有在选择了日期和时间时才可点击 */}
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedSlot}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookAppointment;