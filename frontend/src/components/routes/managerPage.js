import { Routes, Route } from "react-router-dom";
import Manager from "../manager/manager_home.js";
import EmployeeDetails from '../manager/employee_list.js';
import AppointmentList from "../manager/appointments.js";
import PatientList from "../manager/patient_list.js";
import BillingList from "../manager/billing_list.js";


function EmployeePage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Manager />} />
        <Route path='/employee_list' element={<EmployeeDetails />} />
        <Route path='/app_list' element={<AppointmentList />} />
        <Route path='/bill_list' element={<BillingList />} />
        <Route path='/patient_list' element={<PatientList />} />
      </Routes>
    </div>
  );
}

export default EmployeePage;