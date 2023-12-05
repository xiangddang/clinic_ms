from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
user_bp = Blueprint('user_bp', __name__)

# login
@user_bp.route('/<username>', methods=['GET'])
def login(username):

    # Fetch user info from database
    user = db_manager.fetchUser(username)
    
    if user:
        return user, 200
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
    
    # check logic in the mysql procedure
    update = db_manager.updateUser(username, password, email)
    if update:
        return jsonify({'success': f'user `{username}` updated'}), 200
    else:
        return jsonify({'unsuccessful': 'unable to update'}), 404