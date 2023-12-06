from flask import Flask
from flask_cors import CORS
from user import user_bp
from employee import employee_bp
from patients import patient_bp
from manage import manage_bp


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(patient_bp, url_prefix='/patient')
app.register_blueprint(employee_bp, url_prefix='/employee')
app.register_blueprint(manage_bp, url_prefix='/manage')

    
if __name__ == '__main__':
    app.run(debug=True)
