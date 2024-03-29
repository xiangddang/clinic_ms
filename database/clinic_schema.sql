create database clinic;
use clinic;

-- user
create table User (
	username varchar(32) primary key,
    password varchar(32) not null,
    role enum('patient', 'employee', 'manager') not null,
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
    doctor_id INT not null,
    nurse_id INT default null, -- if the doctor is not paired with a nurse, then nurse_id is null
    pair_time TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (nurse_id) REFERENCES Employee(emp_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (doctor_id, nurse_id)
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
	bill_no int auto_increment not null,
    amount decimal(10, 2) not null,
    status varchar(16) not null, -- paid, unpaid, overdue
    created_date date not null,
    payment_date date default null,
    pay_card int default null,
    patient_id int not null,
    foreign key (pay_card) references credit_card(card_id) on delete cascade on update cascade,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    unique(bill_no, patient_id)
);


-- appointment
create table appointments (
	appointment_no int auto_increment not null,
    app_date date not null,
    app_time time not null,
    patient_id int default null,
    doctor_id int not null,
    -- patient_id is null means the appointment is not scheduled
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade,
    unique(appointment_no, doctor_id)
);

-- medical records
create table disease(
	dis_id int auto_increment primary key,
    dis_name varchar(32) not null,
    dis_descirption varchar(255)
);

create table MedicalRecords(
	medical_records_no int auto_increment not null,
    record_date date not null,
	patient_id int not null,
    doctor_id int not null,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade,
    unique(medical_records_no, patient_id)
);

create table diagnosis (
	medical_records_no int not null,
	patient_id int not null,
	dis_id int not null,
    unique(medical_records_no, dis_id, patient_id),
    foreign key (medical_records_no, patient_id) references MedicalRecords(medical_records_no, patient_id) on delete cascade on update cascade,
    foreign key (dis_id) references disease(dis_id) on delete cascade on update cascade
);

create table medication (
	medication_id int auto_increment primary key,
    medication_name varchar(32) not null,
    medication_description varchar(256)
);

create table prescription (
	medical_records_no int not null,
    patient_id int not null,
    medication_id int not null,
    dosage varchar(100), -- eg. 500 mg or 2 tablets,
    frequency varchar(50),
    duration int, -- unit days
    unique(medical_records_no, medication_id, patient_id),
    foreign key (medication_id) references medication(medication_id) on delete cascade on update cascade,
    foreign key (medical_records_no, patient_id) references MedicalRecords(medical_records_no, patient_id) on delete cascade on update cascade,
    check (duration > 0)
);

-- all user defined functions below

-- get user by username
delimiter $$
create procedure get_user_by_username(in p_username varchar(32))
begin
    select * from User where username = p_username;
end $$
delimiter ;

-- create user account for patient, and automatically create a patient record for him/her
delimiter $$

create procedure create_user_patient(IN p_username varchar(32), in p_password varchar(32), in p_email varchar(64))
begin
	start transaction;
    -- insert into User table
    insert into User (username, password, role, email) values (p_username, p_password, 'patient', p_email);
    -- insert into Patient table, only username, let patient complete later
    insert into Patient (username) values (p_username);
    commit;
end $$

delimiter ;


-- update patient information
delimiter $$
create procedure update_patient_information(
    in p_patient_id int,
    in p_name varchar(32),
    in p_date_of_birth date,
    in p_phone char(10),
    in p_street varchar(64),
    in p_city varchar(16),
    in p_state char(2),
    in p_zipcode char(5),
    in p_emergency_name varchar(32),
    in p_emergency_phone char(10),
    in p_biological_sex enum('male', 'female')
)
begin
    -- update the Patient record
    update Patient
    set
        name = p_name,
        date_of_birth = p_date_of_birth,
        phone = p_phone,
        street = p_street,
        city = p_city,
        state = p_state,
        zipcode = p_zipcode,
        emergency_name = p_emergency_name,
        emergency_phone = p_emergency_phone,
        biological_sex = p_biological_sex
    where
        patient_id = p_patient_id;
end $$

delimiter ;


-- get patient information by username
delimiter //
Create procedure get_patient_info(in p_username varchar(32))
begin
    Select name, DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth,
    patient_id, phone, street, city, state, zipcode, emergency_name, emergency_phone, username, biological_sex
    From Patient
    Where username = p_username;
end;
//
delimiter ;

-- change information of user account, only change email and password
DELIMITER //
Create procedure edit_user_account(in p_username varchar(32), IN new_email VARCHAR(64), IN new_password VARCHAR(64))
BEGIN
    declare current_email varchar(64);
    declare current_password varchar(64);
    declare result boolean;

    select email, password into current_email, current_password from User where username = p_username;

    -- Check if email and password are different from the current ones
    if current_email is not null and current_email is not null THEN
        if current_email <> new_email or current_password <> new_password THEN
            update User set email = new_email, password = new_password where username = p_username;
        else
            -- email and password does not change
            signal sqlstate '45000' set MESSAGE_TEXT = 'No changes made to the user account';
        end if;
    else
        -- user does not exist
        signal sqlstate '45000' set MESSAGE_TEXT = 'User does not exist';
    end if;

    -- return result
    select result;
END //
DELIMITER ;

DELIMITER $$
-- create a new employee and at the same time create a new user account for this employee automatically
-- if the employee is doctor, create a doctor-nurse pair
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
    DECLARE v_is_doctor BOOL DEFAULT FALSE;
    DECLARE v_is_nurse BOOL DEFAULT FALSE;
    DECLARE v_spe_id INT;
    DECLARE v_emp_id INT;
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    -- generate username based on name and date of birth
    SET generated_username = CONCAT(LEFT(p_name, 1), DATE_FORMAT(p_date_of_birth, '%Y%m%d'));

    -- based on role, set corresponding boolean value
    IF p_role = 'doctor' THEN
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
    INSERT INTO Employee (name, date_of_birth, phone, street, city, state, zipcode, start_date, is_doctor, is_nurse, spe_id, username)
    VALUES (p_name, p_date_of_birth, p_phone, p_street, p_city, p_state, p_zipcode, p_start_date, v_is_doctor, v_is_nurse, v_spe_id, generated_username);

    -- get the generated employee id
    SET v_emp_id = LAST_INSERT_ID();

    -- if the employee is a doctor, create a doctor-nurse pair
    IF v_is_doctor THEN
        INSERT INTO DoctorNursePair (doctor_id, nurse_id, pair_time)
        VALUES (v_emp_id, NULL, CURRENT_TIMESTAMP);
    END IF;

    -- commit
    COMMIT;
END $$

DELIMITER ;

-- get information of employee by username
delimiter //

create procedure get_employee_info(in p_username varchar(32))
begin
    select Employee.emp_id, name, DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth, phone, street, city, state, zipcode, biological_sex, spe_name, is_doctor, is_nurse
    from Employee 
    join specialty on specialty.spe_id = Employee.spe_id
    where username = p_username;
end //
delimiter ;

-- update information of employee
delimiter $$
create procedure update_employee_info(
    in p_employee_id int,
    in p_name varchar(64),
    in p_date_of_birth date,
    in p_phone char(10),
    in p_street varchar(64),
    in p_city varchar(16),
    in p_state char(2),
    in p_zipcode char(5),
    in p_biological_sex enum('male', 'female'),
    in p_spe_name varchar(32)
)
begin
    declare v_spe_id int;
    -- get the specialty id
    select spe_id into v_spe_id from specialty where spe_name = p_spe_name;
    -- update the employee record
    update Employee
    SET
        name = p_name,
        date_of_birth = p_date_of_birth,
        phone = p_phone,
        street = p_street,
        city = p_city,
        state = p_state,
        zipcode = p_zipcode,
        biological_sex = p_biological_sex,
        spe_id = v_spe_id
    where
        emp_id = p_employee_id;
end $$
delimiter ;

-- when employee resign, mark it as inactive and delete user account, delete all appointments in the future
-- if the employee is doctor, delete the doctor-nurse pair
-- if the employee is nurse, make the doctor-nurse pair nurse_id null
DELIMITER //

CREATE PROCEDURE delete_employee(IN employee_id INT)
BEGIN
    DECLARE user_exists INT;
    DECLARE is_doctor BOOL;
    DECLARE is_nurse BOOL;

    -- Check if the user account exists
    SELECT COUNT(*) INTO user_exists FROM employee WHERE emp_id = employee_id;

    IF user_exists > 0 THEN
        start transaction;
        -- check if the employee is doctor or nurse
        SELECT
            is_doctor, is_nurse INTO is_doctor, is_nurse
        FROM
            Employee
        WHERE emp_id = employee_id;

        -- Delete future appointments for the doctor
        IF is_doctor THEN
            DELETE FROM appointments WHERE doctor_id = employee_id AND app_date > NOW();
            -- Delete doctor-nurse pairs associated with the employee
            DELETE FROM doctor_nurse_pairs WHERE doctor_id = employee_id;
        ELSEIF is_nurse THEN
            -- Delete the nurse from doctor-nurse pairs
            UPDATE doctor_nurse_pairs SET nurse_id = NULL WHERE nurse_id = employee_id;
        END IF;

        -- Delete the user account and update employee record
        DELETE FROM User WHERE username = (SELECT username FROM employee WHERE emp_id = employee_id);

        UPDATE employee SET status = 'inactive', username = NULL WHERE emp_id = employee_id;

        commit;

        SELECT 'Employee deleted successfully' AS result;
    ELSE
        SELECT 'Employee not found' AS result;
    END IF;
END //

DELIMITER ;


-- get all appointments for a patient by patient id including the name of the doctor
DELIMITER //

Create PROCEDURE get_appoint_by_patId(in patt_id int)
Begin
    Select appointment_no, DATE_FORMAT(app_date, '%Y-%m-%d') as app_date, TIME_FORMAT(app_time, '%H:%i:%s') as app_time, emp_id, Employee.name as doctor_name
    from appointments
    join Employee on appointments.doctor_id = Employee.emp_id
    where patient_id = patt_id
    order by app_date desc, app_time desc;
End //

DELIMITER ;

-- get all appointments for a doctor or nurse by employee id including the name of the patient
-- if the employee is nurse, return appointments of the doctor he/she paired with
DELIMITER //

Create PROCEDURE get_appoint_by_empId(in employee_id int)
Begin
    Select appointment_no, DATE_FORMAT(app_date, '%Y-%m-%d') as app_date, TIME_FORMAT(app_time, '%H:%i:%s') as app_time, a.patient_id, Patient.name 
    from appointments a 
    join DoctorNursePair dnp on a.doctor_id = dnp.doctor_id
    left join Patient on a.patient_id = Patient.patient_id
    where (dnp.doctor_id = employee_id or dnp.nurse_id = employee_id)
    -- and app_date = CURRENT_DATE()
    and a.patient_id is not null;
End //

DELIMITER ;


-- schedule an appointment for a patient, only patient can call this procedure
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


-- return all available appointments in the next week, which means patient_id is null and appointment_date is in the next week

DELIMITER //

CREATE PROCEDURE get_available_appointments()
BEGIN
    SELECT 
        appointment_no, 
        DATE_FORMAT(app_date, '%Y-%m-%d') AS app_date, 
        TIME_FORMAT(app_time, '%H:%i:%s') AS app_time, 
        Employee.name
    FROM appointments
    join Employee on appointments.doctor_id = Employee.emp_id
    WHERE patient_id IS NULL
      AND app_date >= NOW()
      AND app_date <= DATE_ADD(NOW(), INTERVAL 1 WEEK);
END //

DELIMITER ;


-- cancel an appointment, only when the patient is the one who booked the appointment, and the appointment is in the future

DELIMITER //

CREATE PROCEDURE cancel_appointment(in p_app_no INT, in p_patt_id INT)
BEGIN
    DECLARE this_patient_id INT DEFAULT NULL;
    DECLARE combined_datetime DATETIME DEFAULT NULL;

    -- Check if this appointment exists for this patient
    SELECT patient_id INTO this_patient_id 
    FROM appointments 
    WHERE appointment_no = p_app_no
    AND patient_id = p_patt_id;

    -- If no matching appointment was found, signal an error
    IF this_patient_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Appointment not found or does not belong to the patient', MYSQL_ERRNO = 3004;
    END IF;

    -- Get the exact time of the appointment
    SELECT TIMESTAMP(app_date, app_time) INTO combined_datetime
    FROM appointments
    WHERE appointment_no = p_app_no;

    -- Check if combined_datetime is NULL
    IF combined_datetime IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid appointment date or time', MYSQL_ERRNO = 3006;
    END IF;

    -- Check if appointment is in the future
    IF combined_datetime < NOW() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot cancel past appointments', MYSQL_ERRNO = 3005;
    END IF;

    -- Proceed to cancel the appointment
    UPDATE appointments
    SET patient_id = NULL
    WHERE appointment_no = p_app_no;
END //

DELIMITER ;

-- create appointment for an active doctor for a specific day

delimiter $$ 

create PROCEDURE create_daily_app(doctor_id INT, app_date DATE)
begin
	declare time_increment int default 0;
    declare doctor_status enum('active', 'inactive');
    declare is_doctor bool;

    -- check if the employee is doctor and the status of the doctor
    select status, is_doctor into doctor_status, is_doctor from Employee where emp_id = doctor_id;
    
    if doctor_status <> 'active' or is_doctor <> true then
        signal sqlstate '45000'
        set MESSAGE_TEXT = 'The doctor is not active or not a doctor';
    end if;

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

-- create appointment for all active doctors for a specific day
delimiter $$

create procedure create_appointment_all_doctor(in app_date date)
begin
	declare done int default false;
    declare doctor_id int;
    declare doctor_cursor cursor for select emp_id from Employee where is_doctor = true;
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

-- manager could change the nurse partner for doctor, and only manager could call this procedure
delimiter $$
create procedure update_doctor_nurse_pair(
    in p_doctor_id int,
    in p_nurse_id int
)
begin 
    -- if the nurse_id paired with another doctor, can not update
    if exists(select * from DoctorNursePair where nurse_id = p_nurse_id and doctor_id <> p_doctor_id) then 
        signal sqlstate '45000'
        set MESSAGE_TEXT = 'The nurse is already paired with another doctor';
    else
    -- if the doctor_id exists in the table, then update the nurse_id
        if exists (select * from doctor_nurse_pair where doctor_id = p_doctor_id) then
            update DoctorNursePair 
            set nurse_id = p_nurse_id, pairtime = CURRENT_TIMESTAMP 
            where doctor_id = p_doctor_id;
        else
            -- if the doctor_id does not exist in the table, then insert the pair
            insert into DoctorNursePair(doctor_id, nurse_id, pair_time)
            values (p_doctor_id, p_nurse_id, CURRENT_TIMESTAMP);
        end if;
    end if;
end $$

delimiter ;

-- when a doctor meet with a patient and create a medical record, the system automatically create a billing for the patient
delimiter $$
create trigger create_billing
after insert on MedicalRecords
for each row
begin
    insert into Billing(amount, status, created_date, payment_date, pay_card, patient_id) 
    values (25.00, 'unpaid', current_timestamp, null, null, new.patient_id); -- defualt each billing 25 dollar
end $$
delimiter ;

-- all billing for a patient
delimiter $$
create procedure get_billing_patient(
    in p_patient_id int
)
begin 
    select amount, status, date_format(created_date, '%Y-%m-%d') as created_date, 
    date_format(payment_date, '%Y-%m-%d') as payment_date
    from Billing 
    where patient_id = p_patient_id
    order by created_date desc;
end $$

delimiter ;

-- manager view: all billing created in a certain time period
delimiter $$

create procedure get_billing_time(
    in p_start_date date,
    in p_end_date date
)
begin
    select amount, status, date_format(created_date, '%Y-%m-%d') as created_date,
    date_format(payment_date, '%Y-%m-%d') as payment_date,
    Patient.name as patient_name
    from billing 
    join Patient on billing.patient_id = Patient.patient_id
    where created_date >= p_start_date and created_date <= p_end_date;
end $$

delimiter ;

-- manager view: total received payment in a certain time period
delimiter $$
create procedure payment_time(
    in p_start_date date,
    in p_end_date date
)
begin
    select sum(amount) from billing 
    where payment_date >= p_start_date and payment_date <= p_end_date
    order by payment_date desc;
end $$

delimiter ;

-- manager view: get all active employee info
delimiter $$
create procedure get_all_employees()
begin
    select emp_id, name, date_format(date_of_birth, '%Y-%m-%d') as date_of_birth,
    phone, street, city, state, zipcode, date_format(start_date, '%Y-%m-%d') as start_date,
    status, is_doctor, is_nurse, biological_sex, spe_name, username
    from Employee
    join specialty on specialty.spe_id = Employee.spe_id
    where Employee.status = 'active'
    order by name;
end $$
delimiter ;

-- manager view: all booked appointment
delimiter $$
create procedure get_all_appointments()
begin
    select date_format(app_date, '%Y-%m-%d') as app_date, 
        TIME_FORMAT(app_time, '%H:%i:%s') as app_time,
        Patient.name as patient_name,
        Employee.name as doctor_name
    from appointments 
    left join Patient on appointments.patient_id = Patient.patient_id
    join Employee on appointments.doctor_id = Employee.emp_id
    where appointments.patient_id is not null
    order by app_date desc, app_time desc;
end $$

-- manager view: all patients
delimiter $$
create procedure get_all_patients()
begin
    select patient_id, name, date_format(date_of_birth, '%Y-%m-%d') as date_of_birth,
    phone, street, city, state, zipcode, emergency_name, emergency_phone, username, biological_sex
    from Patient
    order by name;
end $$


-- medical records for a patient
DELIMITER $$

CREATE PROCEDURE get_medical_records(IN p_patient_id INT)
BEGIN
    SELECT 
        mr.medical_records_no, 
        mr.record_date, 
        GROUP_CONCAT(distinct d.dis_name order by d.dis_name separator ', ') AS disease,
        GROUP_CONCAT(distinct m.medication_name order by m.medication_name separator ',') as medication,
        GROUP_CONCAT(distinct CONCAT(p.dosage, ' ', p.frequency, ' for ', p.duration, ' days') order by p.medication_id separator '; ') as prescriptions
    FROM MedicalRecords mr
    LEFT JOIN diagnosis dg ON mr.medical_records_no = dg.medical_records_no
    JOIN disease d ON dg.dis_id = d.dis_id
    JOIN prescription p ON mr.medical_records_no = p.medical_records_no
    JOIN medication m ON p.medication_id = m.medication_id
    WHERE mr.patient_id = p_patient_id
    GROUP BY mr.medical_records_no, mr.record_date
    ORDER BY mr.record_date DESC;
END$$

DELIMITER ;

-- all disease for doctor to choose
delimiter $$
create procedure allDisease()
begin
    select dis_name from Disease;
end $$
delimiter ;

-- all medication for doctor to choose
delimiter $$
create procedure allMedication()
begin
    select medication_name from medication;
end $$

-- create medical record for a patient, it can not relate to any disease or medication
delimiter $$
create procedure create_medical_record(
    p_patient_id int,
    p_doctor_id int
)
begin
    insert into MedicalRecords(record_date, patient_id, doctor_id) values (CURRENT_DATE(), p_patient_id, p_doctor_id);
end $$
delimiter ;

-- add diagnosis for a medical record, only doctor can call this procedure
delimiter $$
create procedure addDiagnosis(
    in p_medical_records_no int,
    in p_dis_name varchar(50),
    in p_patient_id int
)
begin
    insert into Diagnosis values (p_medical_records_no, p_patient_id, (select dis_id from disease where dis_name = p_dis_name));
end $$
delimiter ;

-- add prescription for a medical record, only doctor can call this procedure
delimiter $$
create procedure addPrescription(
    in p_medical_records_no int,
    in p_medication_name varchar(50),
    in p_dosage varchar(100),
    in p_frequency varchar(50),
    in p_duration int,
    in p_patient_id int
)
begin
    insert into Prescription values (p_medical_records_no, p_patient_id,
    (select medication_id from medication where medication_name = p_medication_name), 
    p_dosage, p_frequency, p_duration);
end $$

delimiter ;

-- create a complete medical record for a patient, including diagnosis and prescription, but only one disease and one medication
delimiter $$
create procedure create_medical_record_complete(
    in p_patient_id int,
    in p_doctor_id int,
    in p_dis_name varchar(50),
    in p_medication_name varchar(50),
    in p_dosage varchar(100),
    in p_frequency varchar(50),
    in p_duration int
)
begin
    declare v_medical_records_no int;
    
    start transaction;
    -- insert into MedicalRecords table
    call create_medical_record(p_patient_id, p_doctor_id);
    -- get the medical record number
    select medical_records_no into v_medical_records_no from MedicalRecords where patient_id = p_patient_id order by medical_records_no desc limit 1;
    -- add diagnosis
    call addDiagnosis(v_medical_records_no, p_dis_name, p_patient_id);
    -- add prescription
    call addPrescription(v_medical_records_no, p_medication_name, p_dosage, p_frequency, p_duration, p_patient_id);
    commit;
end $$
delimiter ;

-- get all sprcialty
delimiter $$
create procedure get_all_specialty()
begin
    select spe_name from specialty;
end $$
