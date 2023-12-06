from datetime import date, time
from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
patient_bp = Blueprint('patient_bp', __name__)

# get info of patient with username
@patient_bp.route('/<username>', methods=['GET'])
def get_patient(username):
    patient = db_manager.fetchPatient(username)
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'error': 'patient not found'}), 404
    
# edit information of patient with patient_id
@patient_bp.route('/<patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    print(data)
    # check if all required fields are provided
    if not ('name' in data and 'date_of_birth' in data and \
        'phone' in data and 'street' in data and 'city' in data and \
        'state' in data and 'zipcode' in data and \
        'emergency_name' in data and 'emergency_phone' in data and \
        'biological_sex' in data):
        return jsonify({'error': 'missing info'}), 400
    
    name = data['name']
    date_of_birth = data['date_of_birth']
    phone = data['phone']
    street = data['street']
    city = data['city']
    state = data['state']
    zipcode = data['zipcode']
    emergency_name = data['emergency_name']
    emergency_phone = data['emergency_phone']
    biological_sex = data['biological_sex']
    
    if db_manager.updatePatient(patient_id, name, date_of_birth, phone, street, city, state, zipcode, emergency_name, emergency_phone, biological_sex):
        return jsonify({'message': 'update successfully'}), 200
    else:
        return jsonify({'error': 'update failed'}), 404

# get all appointmnet of patient with patient_id
@patient_bp.route('/apps/<patient_id>', methods=['GET'])
def get_patient_apps(patient_id):
    apps = db_manager.fetchAppointmentsPatient(patient_id)
    if apps:
        return jsonify(apps), 200
    else:
        return jsonify({'error': 'record not found'}), 404
    
# book appointment for patient with patient_id and app_id
@patient_bp.route('/apps/<patient_id>/<app_id>', methods=['PUT'])
def book_app(patient_id, app_id):
    if db_manager.bookAppointment(app_id, patient_id):
        return jsonify({'message': 'book successfully'}), 200
    else:
        return jsonify({'error': 'book failed'}), 404

# get all available appointment
@patient_bp.route('/apps', methods=['GET'])
def get_all_apps():
    apps = db_manager.fetchAllAvailableAppointments()
    if apps:
        return jsonify(apps), 200
    else:
        return jsonify({'error': 'record not found'}), 404
    
# get all medical records of patient with patient_id
@patient_bp.route('/records/<patient_id>', methods=['GET'])
def get_patient_records(patient_id):
    records = db_manager.fetchMedicalRecords(patient_id)
    if records:
        return jsonify(records), 200
    else:
        return jsonify({'error': 'record not found'}), 404
    
# cancel appointment for patient with patient_id and app_id
@patient_bp.route('/apps/<patient_id>/<app_id>', methods=['DELETE'])
def cancel_app(patient_id, app_id):
    if db_manager.cancelAppointment(app_id, patient_id):
        return jsonify({'message': 'cancel successfully'}), 200
    else:
        return jsonify({'error': 'cancel failed'}), 404