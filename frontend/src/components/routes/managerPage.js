import { Routes, Route } from "react-router-dom";
import Manager from "../manager/manager_home.js";
import EmployeeDetails from '../manager/employee_list.js';

function EmployeePage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Manager />} />
        <Route path='/check_employee_list' element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}

export default EmployeePage;