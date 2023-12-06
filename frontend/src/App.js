import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login.js"; // 引入新的 Login 组件
import PatientPage from "./components/routes/patientPage.js";
import Manager from "./components/manager/manager_home.js";

import Register from "../src/components/Register.js";

import './App.css';
import AppointmentList from "./components/patient/appointment_list.js";
import EmployeePage from "./components/routes/employeePage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/employee/*' element={<EmployeePage />} />
        <Route path='/patient/*' element={<PatientPage />} />
        <Route path='/manager/*' element={<Manager />} />

        <Route path='/appointment_list/:patientId' element={<AppointmentList />} />
      </Routes>
    </div>
  );
}

export default App;

