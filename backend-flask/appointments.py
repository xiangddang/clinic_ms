from flask import Flask, request, jsonify, Blueprint
from db_operation import DatabaseManager

db_manager = DatabaseManager()
appointment_bp = Blueprint('appointment_bp', __name__)


# get all available appointment after today
@appointment_bp.route('/all', methods=['GET'])
def get_all_appointment():
    appointments = db_manager.fetchAllAppointment()
    if appointments:
        return jsonify(appointments), 200
    else:
        return jsonify({'error': 'appointment not found'}), 404


# get all appointment for a doctor
# @appointment_bp.route('/doctor/<doctor_id>', methods=['GET'])