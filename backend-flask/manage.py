from flask import Blueprint, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()
manage_bp = Blueprint('manage_bp', __name__)