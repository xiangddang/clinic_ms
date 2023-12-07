import axios from "axios";

class ManageDataService {
    // get all employees
    getEmployees() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/manage/emps`);
    }

    // get all patients
    getPatients() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/manage/pats`);
    }

    // get all booked appointments
    getAppointments() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/manage/apps`);
    }

    // creata a new employee
    createEmployee(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/manage/emps`, data);
    }

    // delete an employee by employee id
    deleteEmployee(emp_id) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/manage/emps/${emp_id}`);
    }

    // get billing info for a time period
    getBillingInfo(data) {
        // Construct URL with query parameters
        const params = new URLSearchParams({
            start_date: data.start_date, 
            end_date: data.end_date
        }).toString();
    
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/manage/bill?${params}`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ManageDataService();