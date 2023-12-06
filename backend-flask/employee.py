from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
employee_bp = Blueprint('employee_bp', __name__)

# get info of employee with employee_id
@employee_bp.route('/<employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = db_manager.fetchEmployee(employee_id)
    if employee:
        return jsonify(employee), 200
    else:
        return jsonify({'error': 'employee not found'}), 404
    
# update info of employee with employee_id
@employee_bp.route('/<employee_id>', methods=['PUT'])
def update_employee(employee_id):
    data = request.get_json()
    if not ('name' in data and 'date_of_birth' in data \
        and 'phone' in data and 'street' in data and 'city' in data\
        and 'state' in data and 'zipcode' in data \
        and 'biological_sex' in data and 'spe_name' in data):
        return jsonify({'error': 'Missing information'}), 400
    
    name = data.get('name')
    date_of_birth = data.get('date_of_birth')
    phone = data.get('phone')
    street = data.get('street')
    city = data.get('city')
    state = data.get('state')
    zipcode = data.get('zipcode')
    biological_sex = data.get('biological_sex')
    spe_name = data.get('spe_name')
    
    update = db_manager.updateEmployee(employee_id, name, date_of_birth, phone, street, city, state, zipcode, biological_sex, spe_name)
    if update:
        return jsonify({'message': f'employee `{employee_id}` updated'}), 200
    else:
        return jsonify({'error': 'failed to update employee'}), 500

# get all appointments of an employee
@employee_bp.route('/apps/<employee_id>', methods=['GET'])
def get_appointments_employee(employee_id):
    appointments = db_manager.fetchAppointmentsEmployee(employee_id)
    if appointments:
        return jsonify(appointments), 200
    else:
        return jsonify({'error': 'appointment record not found'}), 404
    
# get all medications to choose from
@employee_bp.route('/meds', methods=['GET'])
def get_medications():
    medications = db_manager.fetchAllMedication()
    if medications:
        return jsonify(medications), 200
    else:
        return jsonify({'error': 'medication record not found'}), 404
    
# get all diseases to choose from
@employee_bp.route('/dis', methods=['GET'])
def get_diseases():
    diseases = db_manager.fetchAllDisease()
    if diseases:
        return jsonify(diseases), 200
    else:
        return jsonify({'error': 'disease record not found'}), 404
    
# create a new medical record for a patient
@employee_bp.route('/medrec/<patient_id>/<doctor_id>', methods=['POST'])
def create_medical_record(patient_id, doctor_id):
    create = db_manager.createMedicalRecord(patient_id, doctor_id)
    if create:
        return jsonify({'message': f'medical record created'}), 200
    else:
        return jsonify({'error': 'failed to create medical record'}), 500

# add a diagnosis to a medical record
@employee_bp.route('/diag/<medical_record_id>/<disease>', methods=['POST'])
def create_diagnosis(medical_record_id, disease):
    create = db_manager.addDiagnosis(medical_record_id, disease)
    if create:
        return jsonify({'message': f'diagnosis created'}), 200
    else:
        return jsonify({'error': 'failed to create diagnosis'}), 500

# add a prescription to a medical record
@employee_bp.route('/pres/<medical_record_id>', methods=['POST'])
def create_prescprition(medical_record_id):
    data = request.get_json()
    if not ('medication_name' in data and 'dosage' in data \
        and 'frequency' in data and 'duration' in data):
        return jsonify({'error': 'Missing information'}), 400
    
    medication_name = data.get('medication_name')
    dosage = data.get('dosage')
    frequency = data.get('frequency')
    duration = data.get('duration')
    
    create = db_manager.addPrescription(medical_record_id, medication_name, dosage, frequency, duration)
    if create:
        return jsonify({'message': f'prescription created'}), 200
    else:
        return jsonify({'error': 'failed to create prescription'}), 500
