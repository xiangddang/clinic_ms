from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
user_bp = Blueprint('user_bp', __name__)

# login
@user_bp.route('/login', methods=['GET'])
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


# register
@user_bp.route('/register', methods=['POST'])
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


