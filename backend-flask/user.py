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

    username = data.get('username')
    password = data.get('password')

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
    if 'username' not in data or 'password' not in data or 'email' not in data:
        return jsonify({'error': 'Missing username or password or email'}), 400

    username = data.get('username')
    password = data.get('password')
    email = data.get("email")
    
    # check if the username is already taken
    user = db_manager.fetchUser(username)
    if user:
        return jsonify({'error': 'username already taken'}), 400
    
    # create user
    success = db_manager.createPatientUser(username, password, email)
    if success:
        return jsonify({'success': 'user created'}), 201
    else:
        return jsonify({'error': 'failed to create user'}), 500

# get user info
@user_bp.route('/info/<username>', methods=['GET'])
def get_user(username):
    user = db_manager.fetchUser(username)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({'error': 'user not found'}), 404

# update user info 还需要更新一下sql里面的procedure
@user_bp.route('/update/<username>', methods=['PUT'])
def update_user(username):
    data = request.get_json()
    # check if the required fields are in the request
    if 'password' not in data or 'email' not in data:
        return jsonify({'error': 'Missing username or password or email'}), 400

    password = data.get('password')
    email = data.get("email")
    
    user = db_manager.fetchUser(username)
    if not user:
        return jsonify({'error': 'user not found'}), 404
    # if no info changed, return fail
    if user['password'] == password and user['email'] == email:
        return jsonify({'error': 'no change'}), 400
    
    update = db_manager.updateUser(username, password, email)
    if update:
        return jsonify({'success': f'user `{username}` updated'}), 200
    else:
        return jsonify({'error': 'user not found'}), 404