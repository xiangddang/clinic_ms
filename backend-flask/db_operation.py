import pymysql
import os
from dotenv import load_dotenv

# connect to database
import pymysql

class DatabaseManager:
    def __init__(self):
        # 初始化数据库连接
        self.connection = pymysql.connect(
            host='localhost',
            user='root',
            password='LZUXyy2019@',
            database='clinic'
        )

    def fetchUser(self, username):
        try:
        # Create a cursor and execute the SQL query
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM User WHERE username=%s", (username,))
                user = cursor.fetchone()
            return user
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def createUser(self, username, password, role, email):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("INSERT INTO User (username, password, role, email) VALUES (%s, %s, %s, %s)", (username, password, role, email))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
    
    def updateUser(self, username, password, role, email):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("UPDATE User SET password=%s, role=%s, email=%s WHERE username=%s", (password, role, email, username))
            self.connection.commit()
            return True
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return False
        
    def fetchPatient(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM Patient WHERE patient_id=%s", (patient_id,))
                patient = cursor.fetchone()
            return patient
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
    
    def fetchAppointmentsPatient(self, patient_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM appointments WHERE patient_id=%s", (patient_id,))
                appointments = cursor.fetchall()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def fetchAppointmentsDoctor(self, doctor_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM appointments WHERE doctor_id=%s", (doctor_id,))
                appointments = cursor.fetchall()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
    
    def fetchParterDoctor(self, nurse_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT doctor_id FROM DoctorNursePair WHERE nurse_id=%s", (nurse_id,))
                doctor = cursor.fetchone()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None
        
    def fetchPartnerNurse(self, doctor_id):
        try:
            with self.connection.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT nurse_id FROM DoctorNursePair WHERE doctor_id=%s", (doctor_id,))
                nurse = cursor.fetchone()
        except pymysql.Error as e:
            print(f"Database error: {str(e)}")
            return None

    def close_connection(self):
        # 关闭数据库连接
        self.connection.close()