from flask import Blueprint, request, jsonify

appointment_bp = Blueprint('appointment_bp', __name__)

@appointment_bp.route('/patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = db_manager.fetchPatient(patient_id)
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'error': 'patient not found'}), 404
    