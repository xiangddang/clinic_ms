import { Routes, Route, Link } from "react-router-dom";
import Patient from "../patient/patient_home.js";
import CheckPrescript from "../patient/check_prescript.js";

function PatientPage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Patient />} />
        <Route path='/check_prescript/${patientId}' element={<CheckPrescript />} />
      </Routes>
    </div>
  );
}

export default PatientPage;