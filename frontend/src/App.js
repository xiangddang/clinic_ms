import { Routes, Route, Link } from "react-router-dom";
import Login from "../src/components/Login.js"; // 引入新的 Login 组件
import Employee from "./components/employee/employee_home.js";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<></>} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/patient' element={<></>} />
      </Routes>
    </div>
  );
}

export default App;

