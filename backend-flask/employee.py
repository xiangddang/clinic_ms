from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
employee_bp = Blueprint('employee_bp', __name__)

@employee_bp.route('/employee/<employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = db_manager.fetchEmployee(employee_id)
    if employee:
        return jsonify(employee), 200
    else:
        return jsonify({'error': 'employee not found'}), 404