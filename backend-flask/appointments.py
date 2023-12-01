from flask import Flask, request, jsonify
from db_operation import DatabaseManager

db_manager = DatabaseManager()