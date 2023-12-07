from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
manage_bp = Blueprint('manage_bp', __name__)

# get all employees
@manage_bp.route('/emps', methods=['GET'])
def get_employees():
    employees = db_manager.fetchAllEmployees()
    if employees:
        return jsonify(employees), 200
    else:
        return jsonify({'error': 'employee record not found'}), 404
    
# get all patients
@manage_bp.route('/pats', methods=['GET'])
def get_patients():
    patients = db_manager.fetchAllPatients()
    if patients:
        return jsonify(patients), 200
    else:
        return jsonify({'error': 'patient record not found'}), 404

# get all appointments
@manage_bp.route('/apps', methods=['GET'])
def get_appointments():
    appointments = db_manager.fetchAllAppointments()
    if appointments:
        return jsonify(appointments), 200
    else:
        return jsonify({'error': 'appointment record not found'}), 404

# create a new employee
@manage_bp.route('/emps', methods=['POST'])
def create_new_employee():
    data = request.get_json()
    
    if not ('name' in data and 'date_of_birth' in data \
        and 'phone' in data and 'street' in data and 'city' in data\
        and 'state' in data and 'zipcode' in data \
        and 'start_date' in data and 'role' in data \
        and 'spe_name' in data and 'email' in data):
        
        return jsonify({'error': 'Missing information'}), 400
    
    name = data.get('name')
    date_of_birth = data.get('date_of_birth')
    phone = data.get('phone')
    street = data.get('street')
    city = data.get('city')
    state = data.get('state')
    zipcode = data.get('zipcode')
    start_date = data.get('start_date')
    role = data.get('role')
    spe_name = data.get('spe_name')
    email = data.get('email')
    
    create = db_manager.createEmployee(name, date_of_birth, phone, street, city, state, zipcode, start_date, role, spe_name, email)
    if create:
        return jsonify({'message': f'employee `{name}` created'}), 200
    else:
        return jsonify({'error': 'failed to create employee'}), 500

# delete an employee
@manage_bp.route('/emps/<employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    delete = db_manager.deleteEmployee(employee_id)
    if delete:
        return jsonify({'message': f'employee `{employee_id}` deleted'}), 200
    else:
        return jsonify({'error': 'failed to delete employee'}), 500
    
# get billing information for a specific time period
@manage_bp.route('/bill/<start_date>/<end_date>', methods=['GET'])
def get_billing(start_date, end_date):
    billing = db_manager.fetchBillingAdmin(start_date, end_date)
    if billing:
        return jsonify(billing), 200
    else:
        return jsonify({'error': 'billing record not found'}), 404