use clinic;

-- insert data into User
INSERT INTO User (username, password, role, email) VALUES ('johndoe', 'password123', 'patient', 'johndoe@example.com');
INSERT INTO User (username, password, role, email) VALUES ('janedoe', 'password123', 'patient', 'janedoe@example.com');
INSERT INTO User (username, password, role, email) VALUES ('drsmith', 'password123', 'employee', 'drsmith@example.com');
INSERT INTO User (username, password, role, email) VALUES ('nursejones', 'password123', 'employee', 'nursejones@example.com');
INSERT INTO User (username, password, role, email) VALUES ('adminuser', 'adminpass', 'employee', 'admin@example.com');


-- insert data into speciality
INSERT INTO specialty (spe_name, spe_discription) VALUES ('General Medicine', 
'Provides primary healthcare services including diagnosis, treatment, and prevention of common illnesses and injuries.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Pediatrics', 
'Specializes in the medical care of infants, children, and adolescents.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Cardiology', 
'Focuses on diagnosing and treating diseases of the heart and blood vessels.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Dermatology', 
'Concerned with the diagnosis and treatment of skin disorders.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Orthopedics', 
'Specializes in the prevention, diagnosis, and treatment of disorders of the bones, joints, ligaments, tendons and muscles.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Neurology', 
'Deals with disorders of the nervous system including the brain and spinal cord.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Gynecology', 
'Focuses on women\'s reproductive health and childbirth.');
INSERT INTO specialty (spe_name, spe_discription) VALUES ('Psychiatry', 
'Specializes in the diagnosis, treatment, and prevention of mental illnesses and disorders.');


-- insert data into Employee
INSERT INTO Employee (name, date_of_birth, phone, street, city, state, zipcode, start_date, 
is_manager, is_doctor, is_nurse, spe_id, username) VALUES 
('Dr. Alice Smith', '1980-04-15', '1234567890', '123 Main St', 'Medville', 'CA', '90210', '2010-06-01',
 False, True, False, 1, 'drsmith');

INSERT INTO Employee (name, date_of_birth, phone, street, city, state, zipcode, start_date, 
is_manager, is_doctor, is_nurse, spe_id, username) VALUES 
('Nurse Bob Johnson', '1985-08-20', '2345678901', '456 Side Rd', 'Nursville', 'TX', '75001', '2015-03-15',
 False, False, True, 1, 'nursejones');
 
-- insert data into DoctorNursePair
INSERT INTO DoctorNursePair (doctor_id, nurse_id, pair_time) VALUES 
(1, 2, current_timestamp());

-- insert data into Patient
INSERT INTO Patient (name, date_of_birth, phone, street, city, state, zipcode, 
emergency_name, emergency_phone, username) VALUES 
('John Doe', '1990-01-01', '3456789012', '789 Circle Ave', 'Patienttown', 'NY', '10001', 'Jane Doe', '4567890123', 'johndoe');

INSERT INTO Patient (name, date_of_birth, phone, street, city, state, zipcode,
 emergency_name, emergency_phone, username) VALUES 
 ('Jane Doe', '1992-02-02', '4567890123', '321 Square Blvd', 'Healthcity', 'FL', '33101', 'John Doe', '3456789012', 'janedoe');

-- insert data into credit card, only patient need add credit card info
INSERT INTO credit_card (card_num, card_holer_name, expiration_time, card_type) VALUES 
('1234567812345678', 'John Doe', '2025-12-31', 'visa');

INSERT INTO credit_card (card_num, card_holer_name, expiration_time, card_type) VALUES 
('8765432187654321', 'Jane Doe', '2024-11-30', 'master');

-- insert data into billing
INSERT INTO billing (amount, status, created_date, payment_date, pay_card, patient_id) VALUES 
(150.0, 'Paid', '2023-01-15', '2023-01-20', 1, 1);

INSERT INTO billing (amount, status, created_date, payment_date, pay_card, patient_id) VALUES 
(200.5, 'Unpaid', '2023-02-10', '2023-02-15', 2, 2);

-- insert data into appointment
-- 2023-11-27
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '09:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '09:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '10:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '10:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '11:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '11:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '14:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '14:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '15:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '15:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '16:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '16:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-27', '17:00:00', NULL, 1);

-- 2023-11-28
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '09:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '09:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '10:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '10:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '11:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '11:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '14:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '14:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '15:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '15:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '16:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '16:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-28', '17:00:00', NULL, 1);

-- 2023-11-29
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '09:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '09:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '10:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '10:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '11:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '11:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '14:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '14:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '15:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '15:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '16:00:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '16:30:00', NULL, 1);
INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) VALUES ('2023-11-29', '17:00:00', NULL, 1);

-- insert data into disease
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Common Cold', 
'A common viral respiratory infection, symptoms include cough, sore throat, runny nose, and fever.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Influenza', 
'A respiratory infection affecting the nose, throat, and lungs, symptoms usually include fever, chills, and muscle ache.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Hypertension', 
'A long-term condition where the blood pressure in the arteries is persistently elevated, potentially leading to heart diseases and stroke.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Diabetes', 
'A chronic disease affecting how the body processes blood sugar, common types include Type 1 and Type 2.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Asthma', 
'A chronic disease affecting the lungs, causing breathing difficulties, chest tightness, and coughing.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Allergies', 
'An overreaction of the immune system to certain substances, common allergens include pollen, dust mites, and certain foods.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Arthritis', 
'Inflammation of the joints, causing joint pain, swelling, and stiffness.');
INSERT INTO disease (dis_name, dis_descirption) VALUES ('Skin Infection', 
'Skin issues caused by bacteria, fungi, or viruses, manifested as redness, itching, or rash.');

-- insert data into MedicalRecords
INSERT INTO MedicalRecords (record_date, patient_id, doctor_id, nurse_id) VALUES ('2023-01-01', 1, 1, 2);

-- insert data into diagnosis
INSERT INTO diagnosis (medical_records_no, dis_id) values (1, 1);
INSERT INTO diagnosis (medical_records_no, dis_id) values (1, 4);

-- insert data into medication
INSERT INTO medication (medication_name, medication_description) VALUES ('Acetaminophen', 
'A pain reliever and a fever reducer, used to treat mild to moderate pain and to reduce fever.');

INSERT INTO medication (medication_name, medication_description) VALUES ('Ibuprofen', 
'A nonsteroidal anti-inflammatory drug (NSAID), used to reduce fever and treat pain or inflammation.');

INSERT INTO medication (medication_name, medication_description) VALUES ('Amoxicillin', 
'An antibiotic used to treat a wide variety of bacterial infections.');

INSERT INTO medication (medication_name, medication_description) VALUES ('Metformin', 
'An oral diabetes medicine that helps control blood sugar levels.');

INSERT INTO medication (medication_name, medication_description) VALUES ('Amlodipine', 
'Used to treat high blood pressure (hypertension) and to prevent chest pain (angina).');

INSERT INTO medication (medication_name, medication_description) VALUES ('Simvastatin', 
'Used to lower cholesterol and triglycerides (types of fat) in the blood.');

INSERT INTO medication (medication_name, medication_description) VALUES ('Omeprazole', 
'Used to treat certain stomach and esophagus problems (such as acid reflux, ulcers).');

INSERT INTO medication (medication_name, medication_description) VALUES ('Cetirizine', 
'An antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing.');

-- insert data into prescription
INSERT INTO prescription (medical_records_no, medication_id, dosage, frequency, duration) values (1, 1, '1 tablet', 'three times per day', 3);
