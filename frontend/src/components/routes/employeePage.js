import { Routes, Route, Link } from "react-router-dom";
import Employee from "../employee/employee_home.js";
import EmployeeProfile from '../employee/employee_profile';
import EditProfile from '../employee/emp_edit_profile.js';

import CheckPrescript from "../patient/check_prescript.js";

function EmployeePage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Employee />} />
        <Route path="/profile/:employeeId" element={<EmployeeProfile />} />
        <Route path="/profile/:employeeId/edit" element={<EditProfile />} />
        <Route path='/check_schedule/:employeeId' element={<CheckSchedule />} />
      </Routes>
    </div>
  );
}

export default EmployeePage;