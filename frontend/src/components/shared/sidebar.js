import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';

const MySidebarComponent = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    // 初始化 Bootstrap Tooltip
    if (sidebarRef.current) {
      // 使用新的类名
      const tooltipTriggerList = Array.from(sidebarRef.current.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }

    // 在组件卸载时，清理 Bootstrap Tooltip
    return () => {
      if (sidebarRef.current) {
        const tooltipTriggerList = Array.from(sidebarRef.current.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
          const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
          if (tooltipInstance) {
            tooltipInstance.dispose();
          }
        });
      }
    };
  }, []); // 依赖数组为空，表示仅在组件挂载和卸载时执行一次

  return (
    <Container fluid>
      <Row>
        {/* 侧边栏 */}
        <Col md={3} className="bg-light" ref={sidebarRef}>
          <Navbar expand="md" className="flex-md-column">
            <Navbar.Toggle aria-controls="sidebar" />
            <Navbar.Collapse id="sidebar">
              <Nav className="flex-md-column">
                <Nav.Link href="#section1" data-bs-toggle="tooltip" title="Section 1 Tooltip">
                  Section 1
                </Nav.Link>
                <Nav.Link href="#section2" data-bs-toggle="tooltip" title="Section 2 Tooltip">
                  Section 2
                </Nav.Link>
                <Nav.Link href="#section3" data-bs-toggle="tooltip" title="Section 3 Tooltip">
                  Section 3
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>

        {/* 主内容区域 */}
        <Col md={9} className="p-0">
          <Navbar bg="light" expand="md">
            <Navbar.Brand href="#home">My React Sidebar App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#profile">Profile</Nav.Link>
                <Nav.Link href="#settings">Settings</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* 主内容 */}
          <Container fluid className="p-3">
            <h2>Main Content</h2>
            <p>This is the main content area.</p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default MySidebarComponent;
