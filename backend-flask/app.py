from flask import Flask, request, jsonify
from db_operations import DatabaseManager

app = Flask(__name__)

db_manager = DatabaseManager()

@app.route('/login', methods=['GET'])
def login():
    # assume the request is json
    data = request.get_json() 
    
    # check if the required fields are in the request
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400
    
    username = request.args.get('username')
    password = request.args.get('password')
    
    # Fetch user info from database
    user = db_manager.fetchUser(username)
    
    if user:
        if user['password'] == password:
            return jsonify({'success': 'login success'}), 200
        else:
            return jsonify({'error': 'wrong password'}), 401
    else:
        return jsonify({'error': 'user not found'}), 404

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # check if the required fields are in the request
    if 'username' not in data or 'password' not in data or 'role' not in data or 'email' not in data:
        return jsonify({'error': 'Missing username or password or email'}), 400

    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    email = data.get("email")
    
    # check if the username is already taken
    user = db_manager.fetchUser(username)
    if user:
        return jsonify({'error': 'username already taken'}), 400
    
    # create user
    success = db_manager.createUser(username, password, role, email)
    if success:
        return jsonify({'success': 'user created'}), 201
    else:
        return jsonify({'error': 'failed to create user'}), 500

@app.route('/patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = db_manager.fetchPatient(patient_id)
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({'error': 'patient not found'}), 404
    
@app.route('/employee/<employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = db_manager.fetchEmployee(employee_id)
    if employee:
        return jsonify(employee), 200
    else:
        return jsonify({'error': 'employee not found'}), 404
    
if __name__ == '__main__':
    app.run(debug=True)

