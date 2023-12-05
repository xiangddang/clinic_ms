create database clinic;
use clinic;

-- user
create table User (
	username varchar(32) primary key,
    password varchar(32) not null,
    role enum('patient', 'employee') not null,
    email varchar(64) not null
);

-- speciality
create table specialty (
	spe_id int auto_increment primary key,
    spe_name varchar(32) not null,
    spe_discription varchar(256)
);

-- employees
create table Employee (
	emp_id INT auto_increment primary key,
    name varchar(64) not null,
    date_of_birth date not null,
    phone char(10) not null,
    -- address
    street varchar(64) not null,
    city varchar(16) not null,
    state char(2) not null,
    zipcode char(5) not null,
    start_date date not null,
    status enum('active', 'invalid') default 'active', -- if the employee resign, mark as inactive
    is_manager bool default false,
    is_doctor bool default false,
    is_nurse bool default false,
    biological_sex enum('male', 'female') not null,
    spe_id int,
    username varchar(32),
    foreign key (spe_id) references specialty(spe_id) on delete cascade on update cascade,
    foreign key (username) references User(username) on delete cascade on update cascade,
    check (not (is_doctor = true and is_nurse = true))
);

-- doctor pair with nurse
CREATE TABLE DoctorNursePair (
    doctor_id INT NOT NULL,
    nurse_id INT default null, -- if the doctor is not paired with a nurse, then nurse_id is null
    pair_time TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (nurse_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (doctor_id, nurse_id),
    UNIQUE (doctor_id),
    UNIQUE (nurse_id)
);

-- patient, when patient create its account, we will automatically create a patient record for him/her so details can be filled later
create table Patient (
	patient_id int auto_increment primary key,
    name varchar(32),
    date_of_birth date,
    phone char(10),
    -- address
    street varchar(64),
    city varchar(16),
    state char(2),
    zipcode char(5),
    emergency_name varchar(32),
    emergency_phone char(10),
    username varchar(32) not null,
    biological_sex enum('male', 'female'),
    foreign key (username) references User(username) on delete cascade on update cascade
);

-- credit card
create table credit_card (
	card_id int auto_increment primary key,
	card_num char(16) not null,
    card_holer_name varchar(64) not null,
    expiration_time date not null,
    card_type enum('visa', 'master') not null
);

-- billing
create table billing(
	bill_no int auto_increment primary key,
    amount decimal(10, 2) not null,
    status varchar(16) not null,
    created_date date not null,
    payment_date date default null,
    pay_card int default null,
    patient_id int not null,
    foreign key (pay_card) references credit_card(card_id) on delete cascade on update cascade,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade
);


-- appointment
create table appointments (
	appointment_no int auto_increment primary key,
    app_date date not null,
    app_time time not null,
    patient_id int default null,
    doctor_id int not null,
    -- patient_id is null means the appointment is not scheduled
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade
);

-- medical records
create table disease(
	dis_id int auto_increment primary key,
    dis_name varchar(32) not null,
    dis_descirption varchar(255)
);

create table MedicalRecords(
	medical_records_no int auto_increment primary key,
    record_date date not null,
	patient_id int not null,
    doctor_id int not null,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade
);

create table diagnosis (
	medical_records_no int not null,
	dis_id int not null,
    primary key(medical_records_no, dis_id),
    foreign key (medical_records_no) references MedicalRecords(medical_records_no) on delete cascade on update cascade,
    foreign key (dis_id) references disease(dis_id) on delete cascade on update cascade
);

create table medication (
	medication_id int auto_increment primary key,
    medication_name varchar(32) not null,
    medication_description varchar(256)
);

create table prescription (
	medical_records_no int not null,
    medication_id int not null,
    dosage varchar(100), -- eg. 500 mg or 2 tablets,
    frequency varchar(50),
    duration int, -- unit days
    primary key (medical_records_no, medication_id),
    foreign key (medication_id) references medication(medication_id) on delete cascade on update cascade,
    foreign key (medical_records_no) references MedicalRecords(medical_records_no) on delete cascade on update cascade
);



-- all user defined functions below

-- get user by username
delimiter $$
create procedure get_user_by_username(in username varchar(32))
begin
    select * from User where username = username;
end $$
delimiter ;

-- create user account for patient, 更新一下，需要自动为patient创建一个patient record
delimiter $$

create procedure create_user_patient(IN p_username varchar(32), in p_password varchar(32), in p_email varchar(64))
begin
    insert into User (username, password, role, email) values (p_username, p_password, 'patient', p_email);
end $$

delimiter ;

-- Obtaining patient information based on patient id
delimiter //
Create procedure get_patient_info(in patt_id int)
begin
    Select name, date_of_birth, biological_sex, phone, street, city, state, zipcode
    From Patient
    Where patient_id = patt_id;
end;
//
delimiter ;

-- Change user account information, only email and password can be changed.
DELIMITER //
Create procedure edit_user_account(in username varchar(32), IN new_email VARCHAR(64), IN new_password VARCHAR(64))
BEGIN
    -- Check if the user exists
    IF EXISTS (SELECT 1 FROM users WHERE username = username) THEN
        -- Update the user's email and password
        UPDATE users
        SET email = new_email, password = new_password
        WHERE username = username;
        
        SELECT 'User account updated successfully' AS result;
    ELSE
        SELECT 'User not found' AS result;
    END IF;
END //
DELIMITER ;

DELIMITER $$
-- create a new employee and at the same time create a new user account for this employee automatically
-- 如果是医生的话，需要同时创建一个doctor-nurse pair
CREATE PROCEDURE CreateEmployeeUser(
    IN p_name VARCHAR(64),
    IN p_date_of_birth DATE,
    IN p_phone CHAR(10),
    IN p_street VARCHAR(64),
    IN p_city VARCHAR(16),
    IN p_state CHAR(2),
    IN p_zipcode CHAR(5),
    IN p_start_date DATE,
    IN p_role VARCHAR(32),
    IN p_spe_name VARCHAR(32),
    IN p_email VARCHAR(64)
)
BEGIN
    DECLARE generated_username VARCHAR(32);
    DECLARE default_password VARCHAR(32) DEFAULT 'clinic123';
    DECLARE v_is_manager BOOL DEFAULT FALSE;
    DECLARE v_is_doctor BOOL DEFAULT FALSE;
    DECLARE v_is_nurse BOOL DEFAULT FALSE;
    DECLARE v_spe_id INT;
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- generate username based on name and date of birth
    SET generated_username = CONCAT(LEFT(p_name, 1), DATE_FORMAT(p_date_of_birth, '%Y%m%d'));

    -- based on role, set corresponding boolean value
    IF p_role = 'manager' THEN
        SET v_is_manager = TRUE;
    ELSEIF p_role = 'doctor' THEN
        SET v_is_doctor = TRUE;
    ELSEIF p_role = 'nurse' THEN
        SET v_is_nurse = TRUE;
    END IF;

    -- find specialty id based on specialty name
    SELECT spe_id INTO v_spe_id FROM specialty WHERE spe_name = p_spe_name;
    IF v_spe_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Specialty not found';
    END IF;

    -- start transaction
    START TRANSACTION;

    -- insert user information
    INSERT INTO User (username, password, role, email)
    VALUES (generated_username, default_password, 'employee', p_email);

    -- insert employee information
    INSERT INTO Employee (name, date_of_birth, phone, street, city, state, zipcode, start_date, is_manager, is_doctor, is_nurse, spe_id, username)
    VALUES (p_name, p_date_of_birth, p_phone, p_street, p_city, p_state, p_zipcode, p_start_date, v_is_manager, v_is_doctor, v_is_nurse, v_spe_id, generated_username);

    -- commit
    COMMIT;
END $$

DELIMITER ;

-- get information of employee by employee id
delimiter //

create procedure get_employee_info(in employee_id int)
begin
    select name, date_of_birth, phone, street, city, state, zipcode, biological_sex, spe_name 
    from Employee where emp_id = employee_id
    join specialty on specialty.spe_id = Employee.spe_id;
end
delimiter ;

-- employee leaves the organization with status set to inactive, user account deleted, but not medical records, appointments, prescriptions, etc...
-- delete future appointments, delete doctor-nurse pair
DELIMITER //

CREATE PROCEDURE delete_employee(IN employee_id INT)
BEGIN
    DECLARE user_exists INT;

    -- Check if the user account exists
    SELECT COUNT(*) INTO user_exists FROM employee WHERE emp_id = employee_id;

    IF user_exists > 0 THEN
        -- Delete future appointments for the employee
        DELETE FROM appointments WHERE doctor_id = employee_id AND app_date > NOW();

        -- Delete doctor-nurse pairs associated with the employee
        DELETE FROM doctor_nurse_pairs WHERE doctor_id = employee_id OR nurse_id = employee_id;

        -- Delete the user account and employee record
        DELETE u, e FROM users u
        JOIN employee e ON u.username = e.username
        WHERE e.emp_id = employee_id;

        SELECT 'Employee deleted successfully' AS result;
    ELSE
        SELECT 'Employee not found' AS result;
    END IF;
END //

DELIMITER ;

-- get all info of appointments by patient id
DELIMITER //

Create PROCEDURE get_appoint_by_patId(in patt_id int)
Begin
    Select * from appointments where patient_id = patt_id;
End //

DELIMITER ;

-- get all info of appointments by employee id
DELIMITER //

Create PROCEDURE get_appoint_by_empId(in employee_id int)
Begin
    Select * from appointments a join DoctorNursePair dnp on a.doctor_id = dnp.id
    where dnp.doctor_id = employee_id or dnp.nurse_id = employee_id;
End //

DELIMITER ;

-- Book an appointment for a patient, only if the patient_id of the appointment is null, otherwise an error will be reported.
DELIMITER //

CREATE PROCEDURE book_appointment(IN app_id INT, IN patt_id INT)
BEGIN
    DECLARE app_patient_id INT;

    -- Check if the appointment exists and if it's available
    SELECT patient_id INTO app_patient_id FROM appointments WHERE appointment_no = app_id;

    IF app_patient_id IS NULL THEN
        -- Reserve the appointment for the patient
        UPDATE appointments SET patient_id = patt_id WHERE appointment_no = app_id;
        SELECT 'Appointment booked successfully' AS result;
    ELSE
        -- Appointment is already reserved, return an error
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Appointment is already reserved', MYSQL_ERRNO = 3001;
    END IF;
END //

DELIMITER ;

-- Returns appointments that are currently available for booking, only appointments for the week ahead, and appointments where the patient id is null.
DELIMITER //

CREATE PROCEDURE get_available_appointments()
BEGIN
    SELECT *
    FROM appointments
    WHERE patient_id IS NULL
      AND appointment_date >= NOW()
      AND appointment_date <= DATE_ADD(NOW(), INTERVAL 1 WEEK);
END //

DELIMITER ;

-- Cancel an appointment for a patient, only if the patient_id of the appointment is the patient's id, otherwise an error is reported.
DELIMITER //

CREATE PROCEDURE delete_appointments(in patt_id int)
BEGIN
    Declare this_patient_id int;
    Select patient_id into this_patient_id from appointments where patient_id = patt_id;
    If this_patient_id is not NULL THEN
        Delete FROM appointments
        WHERE patient_id = patt_id
            AND appointment_date >= NOW()
            AND appointment_date <= DATE_ADD(NOW(), INTERVAL 1 WEEK);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Wrong patient ID', MYSQL_ERRNO = 3001;
    END IF;
END //

DELIMITER ;

-- create appointment for one doctor for a specific day, update that you can only create an appointment if the doctor is active
delimiter $$ 

create PROCEDURE create_daily_app(doctor_id INT, app_date DATE)
begin
	declare time_increment int default 0;
    
    -- morning
    set time_increment = 0;
    while time_increment < 6 DO
		INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) 
		VALUES (app_date, ADDTIME('09:00:00', MAKETIME(time_increment DIV 2, (time_increment MOD 2) * 30, 0)), NULL, doctor_id);
		SET time_increment = time_increment + 1;
	END WHILE;
	
    -- afternoon
	SET time_increment = 0;
	WHILE time_increment < 7 DO
		INSERT INTO appointments (app_date, app_time, patient_id, doctor_id) 
		VALUES (app_date, ADDTIME('14:00:00', MAKETIME(time_increment DIV 2, (time_increment MOD 2) * 30, 0)), NULL, doctor_id);
		SET time_increment = time_increment + 1;
	END WHILE;
END$$

DELIMITER ;

-- Create appointments for all active doctors
delimiter $$

create procedure create_appointment_all_doctor(in app_date date)
begin
	declare done int default false;
    declare doctor_id int;
    declare doctor_cursor cursor for select doctor_id from Employee where is_doctor = true;
    declare continue handler for not found set done = true;
    
    open doctor_cursor;
    read_loop: LOOP
		fetch doctor_cursor into doctor_id;
        if done then
			leave read_loop;
		end if;
        
        call create_daily_app(doctor_id, app_date);
	end loop;
    close doctor_cursor;
end $$

delimiter ;
