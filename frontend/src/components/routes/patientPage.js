import { Routes, Route } from "react-router-dom";
import Patient from "../patient/patient_home.js";
import PatientProfile from '../patient/patient_profile';
import EditProfile from '../patient/pat_edit_profile.js';

function PatientPage() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Patient />} />
        
        <Route path="/profile/:patientId" element={<PatientProfile />} />
        <Route path="/profile/:patientId/edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default PatientPage;