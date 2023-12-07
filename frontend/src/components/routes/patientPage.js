import { Routes, Route } from "react-router-dom";
import Patient from "../patient/patient_home.js";
import PatientProfile from '../patient/patient_profile';
import EditProfile from '../patient/pat_edit_profile.js';
import AppointmentList from "../patient/appointment_list.js";

import CheckPrescript from "../patient/check_prescript.js";

function PatientPage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/:username' element={<Patient />} />
        
        <Route path="/profile/:username/:patientId" element={<PatientProfile />} />
        <Route path="/profile/:username/:patientId/edit" element={<EditProfile />} />
        <Route path='/check_apps/:patientId' element={<AppointmentList />} />
        <Route path='/check_prescript/:patientId' element={<CheckPrescript />} />
      </Routes>
    </div>
  );
}

export default PatientPage;