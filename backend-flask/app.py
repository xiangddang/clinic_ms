from flask import Flask
from user import user_bp
from employee import employee_bp
from patients import patient_bp
from manage import manage_bp


app = Flask(__name__)

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(patient_bp, url_prefix='/patient')
app.register_blueprint(employee_bp, url_prefix='/employee')
app.register_blueprint(manage_bp, url_prefix='/manage')

    
if __name__ == '__main__':
    app.run(debug=True)
