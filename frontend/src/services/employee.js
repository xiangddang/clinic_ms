import axios from 'axios';

class EmployeeDataService {
    // get info of employee by employee id
    getEmployee(username) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/employee/${username}`);
    }

    // update info of employee by employee id
    updateEmployee(employee_id, data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/employee/${employee_id}`,
            data
        );
    }

    // get all appointments of the employee by employee id
    getAppointmentEmployee(employee_id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/employee/apps/${employee_id}`);
    }

    // get all medications to choose from
    getMedications() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/employee/meds`);
    }

    // get all diseases to choose from
    getDiseases() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/employee/dis`);
    }

    // create a new medical record for a patient
    createMedicalRecord(patient_id, doctor_id) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/employee/medrec/${patient_id}/${doctor_id}`);
    }

    // add a diagnosis to a medical record, input disease name
    addDiagnosis(medrec_id, data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/employee/diag/${medrec_id}`, data);
    }

    // add a prescription to a medical record, input medication name, dosage, frequency and duration
    addPrescription(medrec_id, data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/employee/pres/${medrec_id}`, data);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new EmployeeDataService();