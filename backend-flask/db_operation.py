import pymysql
import os
from dotenv import load_dotenv

# connect to database
import pymysql
load_dotenv('.env')

class DatabaseManager:
    def __init__(self):
        # 初始化数据库连接
        self.connection = pymysql.connect(
            host='localhost',
            user=os.getenv('DATABASE_USER'),
            password=os.getenv('DATABASE_PASSWORD'),
            database=os.getenv('DATABASE_NAME')
        )

    def fetchUser(self, username):
        try:
        # Create a cursor and execute the SQL query
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_user_by_username', (username,))
                user = cursor.fetchone()
            return user
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def createPatientUser(self, username, password, email):
        try:
            with self.connection.cursor() as cursor:
                cursor.callproc('create_user_patient', (username, password, email))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    def updateUser(self, username, password, email):
        try:
            with self.connection.cursor() as cursor:
                cursor.callproc('edit_user_account', (username, password, email))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    # fetch patient info by patient_id
    def fetchPatient(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_patient_info', (patient_id,))
                patient = cursor.fetchone()
            return patient
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # update info of patient with patient_id
    def updatePatient(self, patient_id, name, date_of_birth, phone, street, city, state, zipcode, emergency_name, emergency_phone, biological_sex):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('update_patient_information', (patient_id, name, date_of_birth, phone, street, city, state, zipcode, emergency_name, emergency_phone, biological_sex,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None        
            
    def fetchEmployee(self, employee_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM Employee WHERE emp_id=%s", (employee_id,))
                employee = cursor.fetchone()
            return employee
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
        
    def fetchAllPatients(self):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM Patient")
                patients = cursor.fetchall()
            return patients
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def fetchAllEmployees(self):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM Employee")
                employees = cursor.fetchall()
            return employees
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # fetch all appointments of patient by patient id, rescending order by date and time
    def fetchAppointmentsPatient(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_appoint_by_patId', (patient_id,))
                appointments = cursor.fetchall()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def fetchAppointmentsEmployee(self, emp_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM appointments WHERE doctor_id=%s", (emp_id,))
                appointments = cursor.fetchall()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # book appointment for a patient
    def bookAppointment(self, app_id, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('book_appointment', (app_id, patient_id,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    # fetch all available appointments for patients to book
    def fetchAllAvailableAppointments(self):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_available_appointments')
                appointments = cursor.fetchall()
            return appointments
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # fetch all medical records of a patient
    def fetchMedicalRecords(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_medical_records', (patient_id,))
                records = cursor.fetchall()
            return records
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # cancel appointment for a patient
    def cancelAppointment(self, app_id, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('cancel_appointment', (app_id, patient_id))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False

    def close_connection(self):
        # 关闭数据库连接
        self.connection.close()