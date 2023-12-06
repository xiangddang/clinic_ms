import { Routes, Route } from "react-router-dom";
import Patient from "../patient/patient_home.js";
import PatientProfile from '../patient/patient_profile';
import EditProfile from '../patient/pat_edit_profile.js';

import CheckPrescript from "../patient/check_prescript.js";

function PatientPage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/:username' element={<Patient />} />
        
        <Route path="/profile/:patientId" element={<PatientProfile />} />
        <Route path="/profile/:patientId/edit" element={<EditProfile />} />

        <Route path='/check_prescript/:patientId' element={<CheckPrescript />} />
      </Routes>
    </div>
  );
}

export default PatientPage;