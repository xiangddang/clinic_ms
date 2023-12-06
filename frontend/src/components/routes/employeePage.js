import { Routes, Route } from "react-router-dom";
import Employee from "../employee/employee_home.js";
import EmployeeProfile from '../employee/employee_profile';
import EditProfile from '../employee/emp_edit_profile.js';
import CheckSchedule from "../employee/check_schedule.js";
import CheckMedicalRecord from "../employee/check_medical_by_pid.js";

function EmployeePage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Employee />} />
        <Route path="/profile/:employeeId" element={<EmployeeProfile />} />
        <Route path="/profile/:employeeId/edit" element={<EditProfile />} />
        <Route path='/check_schedule/:employeeId' element={<CheckSchedule />} />
        <Route path='/check_medical_rec/:patientId' element={<CheckMedicalRecord />} />
      </Routes>
    </div>
  );
}

export default EmployeePage;