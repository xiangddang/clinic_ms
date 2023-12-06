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
    
    # fetch patient info by username
    def fetchPatient(self, username):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_patient_info', (username,))
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
    
    # fetch information of an employee by employee_id
    def fetchEmployee(self, employee_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_employee_info', (employee_id,))
                employee = cursor.fetchone()
            return employee
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
        
    # update information of an employee
    def updateEmployee(self, employee_id, name, date_of_birth, phone, street, city, state, zipcode, biological_sex, spe_name):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('update_employee_info', (employee_id, name, date_of_birth, phone, street, city, state, zipcode, biological_sex, spe_name,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
        
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
                cursor.callproc('get_appoint_by_empId', (emp_id,))
                appointments = cursor.fetchall()
            return appointments
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
    
    # fetch all disease for doctor to choose
    def fetchAllDisease(self):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('allDisease')
                diseases = cursor.fetchall()
            return diseases
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    # fectch all medication for doctor to choose
    def fetchAllMedication(self):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('allMedication')
                medications = cursor.fetchall()
            print(medications)
            return medications
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
        
    # create a medical record for a patient
    def createMedicalRecord(self, patient_id, doctor_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('create_medical_record', (patient_id, doctor_id,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    # add a diagnosis for a medical record
    def addDiagnosis(self, record_no, diagnosis):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('addDiagnosis', (record_no, diagnosis,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    # add a prescription for a medical record
    def addPrescription(self, record_no, medication_name, dosage, frequency, duration):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('addPrescription', (record_no, medication_name, dosage, frequency, duration,))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    # fecth billing for a patient
    def fetchBillingPatient(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.callproc('get_billing_patient', (patient_id,))
                billing = cursor.fetchall()
            return billing
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None

    def close_connection(self):
        # 关闭数据库连接
        self.connection.close()