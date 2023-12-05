import { Routes, Route, Link } from "react-router-dom";
import Patient from "../patient/patient_home.js";
import CheckPrescript from "../patient/check_prescript.js";
import PatientProfile from '../patient/patient_profile';
import EditProfile from '../patient/pat_edit_profile.js';

function PatientPage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Patient />} />
        <Route path='/check_prescript/:patientId' element={<CheckPrescript />} />
        <Route path="/patient/profile/:patientId" element={<PatientProfile />} />
        <Route path="/profile/:patientId/edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default PatientPage;