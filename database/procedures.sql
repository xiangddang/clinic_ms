-- manager could change the nurse partner for doctor, and only manager could call this procedure
delimiter $$
create procedure update_doctor_nurse_pair(
    in p_doctor_id int,
    in p_nurse_id int
)
begin 
    -- if the doctor_id exists in the table, then update the nurse_id
    if exists (select * from doctor_nurse_pair where doctor_id = p_doctor_id) then
        update DoctorNursePair 
        set nurse_id = p_nurse_id, pairtime = CURRENT_TIMESTAMP 
        where doctor_id = p_doctor_id;
    else
        -- if the doctor_id does not exist in the table, then insert the pair
        insert into DoctorNursePair values (p_doctor_id, p_nurse_id, CURRENT_TIMESTAMP);
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

-- 根据medical_records_no返回所有medical records，包括diagnosis和prescription，

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

-- 为patient的medical records添加diagnosis，只有doctor可以调用这个procedure

-- 为patient的medical records添加prescription，只有doctor可以调用这个procedure
