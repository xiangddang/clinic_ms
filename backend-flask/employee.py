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