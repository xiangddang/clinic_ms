import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login.js"; // 引入新的 Login 组件
import Employee from "./components/employee/employee_home.js";
import PatientPage from "./components/routes/patientPage.js";
import Manager from "./components/manager/manager_home.js";
import CheckPrescript from "./components/patient/check_prescript.js";
import Register from "../src/components/Register.js";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/employee/*' element={<Employee />} />
        <Route path='/patient/*' element={<PatientPage />} />
        <Route path='/manager' element={<Manager />} />
        <Route path='/check_prescript/:patientId' element={<CheckPrescript />} />
      </Routes>
    </div>
  );
}

export default App;

