import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/navbar.css';

const Employee = () => {
  const employeeId = '123';
  return (
    <Navbar>
      <Navbar.Brand href="/patient">X Healthcare</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/employee">
              Home
          </Nav.Link>
          <Nav.Link as={Link} to={`/employee/profile/${employeeId}`}>
              Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Employee;
