import axios from 'axios';

class PatientDataService {
    // get info of patient by patient id
    getPatient(username) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/patient/${username}`);
    }

    // update info of patient by patient id
    updatePatient(patient_id, data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/patient/${patient_id}`,
            data
        );
    }

    // get all appointments of the patient by patient id
    getAppointmentPatient(patient_id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/patient/apps/${patient_id}`);
    }

    // book an appointment for the patient by patient id and appointment id
    bookAppointment(patient_id, appointment_id) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/patient/apps/${patient_id}/${appointment_id}`);
    }

    // get all available appointments
    getAvailableAppointments() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/patient/apps`);
    }

    // cancel an appointment for the patient by patient id and appointment id
    cancelAppointment(patient_id, appointment_id) {
        return axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/patient/apps/${patient_id}/${appointment_id}`);
    }
}


/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new PatientDataService();