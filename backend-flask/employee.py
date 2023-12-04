from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
employee_bp = Blueprint('employee_bp', __name__)

# 获得员工信息，需要传入员工id，返回员工信息，需要对db进行修改，不仅返回employee table信息，还要返回他的user信息，他的partner信息
@employee_bp.route('/employee/<employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = db_manager.fetchEmployee(employee_id)
    if employee:
        return jsonify(employee), 200
    else:
        return jsonify({'error': 'employee not found'}), 404
    
# 删除员工