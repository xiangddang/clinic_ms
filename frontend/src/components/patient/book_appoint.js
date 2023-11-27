import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookAppointment = ({ show, handleClose }) => {
  // 状态：可用日期数组
  const [availableDates, setAvailableDates] = useState([]);
  // 状态：用户选择的日期和时间
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // 在组件挂载时，获取可用日期数据
  useEffect(() => {
    fetchAvailableDates();
  }, []);

  // 从后端获取可用日期数据的函数
  const fetchAvailableDates = async () => {
    try {
      // 发送请求到后端获取可用日期数据
      const response = await fetch("/api/available-dates");
      const data = await response.json();
      // 设置可用日期数组的状态
      setAvailableDates(data.availableDates);
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  // 处理确认按钮点击事件
  const handleConfirm = () => {
    // 处理确认逻辑，可以将选定的日期和时间传递给后端进行处理
    console.log("Confirmed:", selectedDate, selectedTime);
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
        {/* 选择日期 */}
        <Form.Group controlId="formDate">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Select a date</option>
            {/* 渲染可用日期选项 */}
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* 选择时间 */}
        <Form.Group controlId="formTime">
          <Form.Label>Select Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {/* 取消按钮 */}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        {/* 确认按钮，只有在选择了日期时才可点击 */}
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedDate}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookAppointment;
