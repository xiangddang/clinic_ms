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
    start_date date,
    is_manager bool default false,
    is_doctor bool default false,
    is_nurse bool default false,
    spe_id int,
    foreign key (spe_id) references specialty(spe_id) on delete cascade on update cascade,
    check (is_doctor = true and is_nurse = true)
);

-- patient
create table Patient (
	patient_id int auto_increment primary key,
    name varchar(32) not null,
    date_of_birth date not null,
    phone char(10) not null,
    -- address
    street varchar(64) not null,
    city varchar(16) not null,
    state char(2) not null,
    zipcode char(5) not null,
    emergency_name varchar(32) not null,
    emergency_phone char(10) not null
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
    payment_date date not null,
    pay_card int,
    patient_id int not null,
    foreign key (pay_card) references credit_card(card_id) on delete cascade on update cascade,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade
);


-- appointment
create table appointments (
	appointment_no int auto_increment primary key,
    app_date date not null,
    app_time time not null,
    patient_id int,
    doctor_id int not null,
    nurse_id int not null,
    -- patient_id is null means the appointment is not scheduled
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade,
    foreign key (nurse_id) references Employee(emp_id) on delete cascade on update cascade
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
    nurse_id int not null,
    foreign key (patient_id) references Patient(patient_id) on delete cascade on update cascade,
    foreign key (doctor_id) references Employee(emp_id) on delete cascade on update cascade,
    foreign key (nurse_id) references Employee(emp_id) on delete cascade on update cascade
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
    primary key (medical_records_no, medication_id),
    foreign key (medication_id) references medication(medication_id) on delete cascade on update cascade,
    foreign key (medical_records_no) references MedicalRecords(medical_records_no) on delete cascade on update cascade
);

-- insert data into User

-- insert data into speciality

-- insert data into 