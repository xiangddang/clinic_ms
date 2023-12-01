from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
patient_bp = Blueprint('patient_bp', __name__)

# get info of patient with patient_id
@patient_bp.route('/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = db_manager.fetchPatient(patient_id)
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'error': 'patient not found'}), 404
    