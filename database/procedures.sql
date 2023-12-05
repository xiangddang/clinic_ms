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
create trigger create_billing(
    after insert on MedicalRecord
)
begin
    insert into Billing values (25, 'unpaid', current_timestamp, null, null, new.patient_id);
end $$
delimiter ;

-- all billing for a patient
delimiter $$
create procedure billing_patient(
    in p_patient_id int
)
begin 
    select * from Billing where patient_id = p_patient_id;
end $$

delimiter ;

-- manager view: all billing created in a certain time period
delimiter $$

create procedure billing_time(
    in p_start_date date,
    in p_end_date date
)
begin
    select * from billing where created_date >= p_start_date and created_date <= p_end_date;
end $$

delimiter ;

-- manager view: total received payment in a certain time period
delimiter $$
create procedure payment_time(
    in p_start_date date,
    in p_end_date date
)
begin
    select sum(amount) from billing where payment_date >= p_start_date and payment_date <= p_end_date;
end $$

delimiter ;

-- medical records for a patient
DELIMITER $$

CREATE PROCEDURE get_medical_records(IN p_patient_id INT)
BEGIN
    SELECT 
        mr.medical_records_no, 
        mr.record_date, 
        CONCAT(distinct d.dis_name order by d.dis_name separator ', ') AS disease,
        CONCAT(distinct m.medication_name order by m.medication_name separator ',') as medication,
        CONCAT(distinct CONCAT(p.dosage, ' ', p.frequency, 'for', p.duration, ' days') order by p.medication_id separator '; ') as prescriptions
    FROM MedicalRecords mr
    LEFT JOIN diagnosis dg ON mr.medical_records_no = dg.medical_records_no
    JOIN disease d ON dg.dis_id = d.dis_id
    JOIN prescription p ON mr.medical_records_no = p.medical_records_no
    JOIN medication m ON p.medication_id = m.medication_id
    WHERE mr.patient_id = p_patient_id
    GROUP BY mr.medical_records_no;
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
    select med_name from Medication;
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
    in p_dis_name varchar(50)
)
begin
    insert into Diagnosis values (p_medical_records_no, (select dis_id from disease where dis_name = p_dis_name));
end $$
delimiter ;

-- add prescription for a medical record, only doctor can call this procedure
delimiter $$
create procedure addPrescription(
    in p_medical_records_no int,
    in p_medication_name varchar(50),
    in p_dosage varchar(100),
    in p_frequency varchar(50),
    in p_duration int
)
begin
    insert into Prescription values (p_medical_records_no, (select medication_id from medication where medication_name = p_medication_name), p_dosage, p_frequency, p_duration);
end $$
