CREATE DATABASE  IF NOT EXISTS `clinic` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `clinic`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: clinic
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_no` int NOT NULL AUTO_INCREMENT,
  `app_date` date NOT NULL,
  `app_time` time NOT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int NOT NULL,
  UNIQUE KEY `appointment_no` (`appointment_no`,`doctor_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2023-12-05','09:00:00',NULL,1),(2,'2023-12-05','09:30:00',NULL,1),(3,'2023-12-05','10:00:00',NULL,1),(4,'2023-12-05','10:30:00',NULL,1),(5,'2023-12-05','11:00:00',NULL,1),(6,'2023-12-05','11:30:00',NULL,1),(7,'2023-12-05','14:00:00',NULL,1),(8,'2023-12-05','14:30:00',NULL,1),(9,'2023-12-05','15:00:00',NULL,1),(10,'2023-12-05','15:30:00',NULL,1),(11,'2023-12-05','16:00:00',NULL,1),(12,'2023-12-05','16:30:00',NULL,1),(13,'2023-12-05','17:00:00',NULL,1),(14,'2023-12-06','09:00:00',NULL,1),(15,'2023-12-06','09:30:00',NULL,1),(16,'2023-12-06','10:00:00',NULL,1),(17,'2023-12-06','10:30:00',NULL,1),(18,'2023-12-06','11:00:00',NULL,1),(19,'2023-12-06','11:30:00',NULL,1),(20,'2023-12-06','14:00:00',NULL,1),(21,'2023-12-06','14:30:00',NULL,1),(22,'2023-12-06','15:00:00',NULL,1),(23,'2023-12-06','15:30:00',NULL,1),(24,'2023-12-06','16:00:00',NULL,1),(25,'2023-12-06','16:30:00',NULL,1),(26,'2023-12-06','17:00:00',NULL,1),(27,'2023-12-07','09:00:00',NULL,1),(28,'2023-12-07','09:30:00',NULL,1),(29,'2023-12-07','10:00:00',NULL,1),(30,'2023-12-07','10:30:00',NULL,1),(31,'2023-12-07','11:00:00',NULL,1),(32,'2023-12-07','11:30:00',NULL,1),(33,'2023-12-07','14:00:00',NULL,1),(34,'2023-12-07','14:30:00',NULL,1),(35,'2023-12-07','15:00:00',NULL,1),(36,'2023-12-07','15:30:00',NULL,1),(37,'2023-12-07','16:00:00',NULL,1),(38,'2023-12-07','16:30:00',NULL,1),(39,'2023-12-07','17:00:00',NULL,1),(40,'2023-12-08','09:00:00',NULL,1),(41,'2023-12-08','09:30:00',NULL,1),(42,'2023-12-08','10:00:00',NULL,1),(43,'2023-12-08','10:30:00',NULL,1),(44,'2023-12-08','11:00:00',NULL,1),(45,'2023-12-08','11:30:00',NULL,1),(46,'2023-12-08','14:00:00',NULL,1),(47,'2023-12-08','14:30:00',NULL,1),(48,'2023-12-08','15:00:00',NULL,1),(49,'2023-12-08','15:30:00',NULL,1),(50,'2023-12-08','16:00:00',NULL,1),(51,'2023-12-08','16:30:00',NULL,1),(52,'2023-12-08','17:00:00',NULL,1),(53,'2023-12-11','09:00:00',NULL,1),(54,'2023-12-11','09:30:00',NULL,1),(55,'2023-12-11','10:00:00',NULL,1),(56,'2023-12-11','10:30:00',NULL,1),(57,'2023-12-11','11:00:00',NULL,1),(58,'2023-12-11','11:30:00',NULL,1),(59,'2023-12-11','14:00:00',NULL,1),(60,'2023-12-11','14:30:00',NULL,1),(61,'2023-12-11','15:00:00',NULL,1),(62,'2023-12-11','15:30:00',NULL,1),(63,'2023-12-11','16:00:00',NULL,1),(64,'2023-12-11','16:30:00',NULL,1),(65,'2023-12-11','17:00:00',NULL,1),(66,'2023-12-12','09:00:00',NULL,1),(67,'2023-12-12','09:30:00',NULL,1),(68,'2023-12-12','10:00:00',NULL,1),(69,'2023-12-12','10:30:00',NULL,1),(70,'2023-12-12','11:00:00',NULL,1),(71,'2023-12-12','11:30:00',NULL,1),(72,'2023-12-12','14:00:00',NULL,1),(73,'2023-12-12','14:30:00',NULL,1),(74,'2023-12-12','15:00:00',NULL,1),(75,'2023-12-12','15:30:00',NULL,1),(76,'2023-12-12','16:00:00',NULL,1),(77,'2023-12-12','16:30:00',NULL,1),(78,'2023-12-12','17:00:00',NULL,1),(79,'2023-12-13','09:00:00',NULL,1),(80,'2023-12-13','09:30:00',NULL,1),(81,'2023-12-13','10:00:00',NULL,1),(82,'2023-12-13','10:30:00',NULL,1),(83,'2023-12-13','11:00:00',NULL,1),(84,'2023-12-13','11:30:00',NULL,1),(85,'2023-12-13','14:00:00',NULL,1),(86,'2023-12-13','14:30:00',NULL,1),(87,'2023-12-13','15:00:00',NULL,1),(88,'2023-12-13','15:30:00',NULL,1),(89,'2023-12-13','16:00:00',NULL,1),(90,'2023-12-13','16:30:00',NULL,1),(91,'2023-12-13','17:00:00',NULL,1),(92,'2023-12-14','09:00:00',NULL,1),(93,'2023-12-14','09:30:00',NULL,1),(94,'2023-12-14','10:00:00',NULL,1),(95,'2023-12-14','10:30:00',NULL,1),(96,'2023-12-14','11:00:00',NULL,1),(97,'2023-12-14','11:30:00',NULL,1),(98,'2023-12-14','14:00:00',NULL,1),(99,'2023-12-14','14:30:00',NULL,1),(100,'2023-12-14','15:00:00',NULL,1),(101,'2023-12-14','15:30:00',NULL,1),(102,'2023-12-14','16:00:00',NULL,1),(103,'2023-12-14','16:30:00',NULL,1),(104,'2023-12-14','17:00:00',NULL,1),(105,'2023-12-15','09:00:00',NULL,1),(106,'2023-12-15','09:30:00',NULL,1),(107,'2023-12-15','10:00:00',NULL,1),(108,'2023-12-15','10:30:00',NULL,1),(109,'2023-12-15','11:00:00',NULL,1),(110,'2023-12-15','11:30:00',NULL,1),(111,'2023-12-15','14:00:00',NULL,1),(112,'2023-12-15','14:30:00',NULL,1),(113,'2023-12-15','15:00:00',NULL,1),(114,'2023-12-15','15:30:00',NULL,1),(115,'2023-12-15','16:00:00',NULL,1),(116,'2023-12-15','16:30:00',NULL,1),(117,'2023-12-15','17:00:00',NULL,1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `bill_no` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(16) NOT NULL,
  `created_date` date NOT NULL,
  `payment_date` date DEFAULT NULL,
  `pay_card` int DEFAULT NULL,
  `patient_id` int NOT NULL,
  UNIQUE KEY `bill_no` (`bill_no`,`patient_id`),
  KEY `pay_card` (`pay_card`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`pay_card`) REFERENCES `credit_card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `billing_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,25.00,'paid','2023-01-15','2023-11-20',1,1),(2,25.00,'unpaid','2023-02-10','2023-11-15',2,2),(3,25.00,'unpaid','2023-12-07',NULL,NULL,1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_card`
--

DROP TABLE IF EXISTS `credit_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_num` char(16) NOT NULL,
  `card_holer_name` varchar(64) NOT NULL,
  `expiration_time` date NOT NULL,
  `card_type` enum('visa','master') NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_card`
--

LOCK TABLES `credit_card` WRITE;
/*!40000 ALTER TABLE `credit_card` DISABLE KEYS */;
INSERT INTO `credit_card` VALUES (1,'1234567812345678','John Doe','2025-12-31','visa'),(2,'8765432187654321','Jane Doe','2024-11-30','master');
/*!40000 ALTER TABLE `credit_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis`
--

DROP TABLE IF EXISTS `diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis` (
  `medical_records_no` int NOT NULL,
  `patient_id` int NOT NULL,
  `dis_id` int NOT NULL,
  UNIQUE KEY `medical_records_no` (`medical_records_no`,`dis_id`,`patient_id`),
  KEY `medical_records_no_2` (`medical_records_no`,`patient_id`),
  KEY `dis_id` (`dis_id`),
  CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`medical_records_no`, `patient_id`) REFERENCES `MedicalRecords` (`medical_records_no`, `patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `diagnosis_ibfk_2` FOREIGN KEY (`dis_id`) REFERENCES `disease` (`dis_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
INSERT INTO `diagnosis` VALUES (1,1,1),(1,1,4);
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease`
--

DROP TABLE IF EXISTS `disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease` (
  `dis_id` int NOT NULL AUTO_INCREMENT,
  `dis_name` varchar(32) NOT NULL,
  `dis_descirption` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease`
--

LOCK TABLES `disease` WRITE;
/*!40000 ALTER TABLE `disease` DISABLE KEYS */;
INSERT INTO `disease` VALUES (1,'Common Cold','A common viral respiratory infection, symptoms include cough, sore throat, runny nose, and fever.'),(2,'Influenza','A respiratory infection affecting the nose, throat, and lungs, symptoms usually include fever, chills, and muscle ache.'),(3,'Hypertension','A long-term condition where the blood pressure in the arteries is persistently elevated, potentially leading to heart diseases and stroke.'),(4,'Diabetes','A chronic disease affecting how the body processes blood sugar, common types include Type 1 and Type 2.'),(5,'Asthma','A chronic disease affecting the lungs, causing breathing difficulties, chest tightness, and coughing.'),(6,'Allergies','An overreaction of the immune system to certain substances, common allergens include pollen, dust mites, and certain foods.'),(7,'Arthritis','Inflammation of the joints, causing joint pain, swelling, and stiffness.'),(8,'Skin Infection','Skin issues caused by bacteria, fungi, or viruses, manifested as redness, itching, or rash.');
/*!40000 ALTER TABLE `disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DoctorNursePair`
--

DROP TABLE IF EXISTS `DoctorNursePair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DoctorNursePair` (
  `doctor_id` int NOT NULL,
  `nurse_id` int DEFAULT NULL,
  `pair_time` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `doctor_id` (`doctor_id`,`nurse_id`),
  KEY `nurse_id` (`nurse_id`),
  CONSTRAINT `doctornursepair_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctornursepair_ibfk_2` FOREIGN KEY (`nurse_id`) REFERENCES `Employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DoctorNursePair`
--

LOCK TABLES `DoctorNursePair` WRITE;
/*!40000 ALTER TABLE `DoctorNursePair` DISABLE KEYS */;
INSERT INTO `DoctorNursePair` VALUES (1,2,'2023-11-01 04:00:00');
/*!40000 ALTER TABLE `DoctorNursePair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone` char(10) NOT NULL,
  `street` varchar(64) NOT NULL,
  `city` varchar(16) NOT NULL,
  `state` char(2) NOT NULL,
  `zipcode` char(5) NOT NULL,
  `start_date` date NOT NULL,
  `status` enum('active','invalid') DEFAULT 'active',
  `is_doctor` tinyint(1) DEFAULT '0',
  `is_nurse` tinyint(1) DEFAULT '0',
  `biological_sex` enum('male','female') NOT NULL,
  `spe_id` int DEFAULT NULL,
  `username` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `spe_id` (`spe_id`),
  KEY `username` (`username`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`spe_id`) REFERENCES `specialty` (`spe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`username`) REFERENCES `User` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_chk_1` CHECK (((`is_doctor` <> true) or (`is_nurse` <> true)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,'Dr. Alice Smith','1980-04-15','1234567890','123 Main St','Medville','CA','90210','2023-11-01','active',1,0,'female',1,'drsmith'),(2,'Nurse Bob Johnson','1985-08-20','2345678901','456 Side Rd','Nursville','TX','75001','2023-11-01','active',0,1,'male',1,'nursejones');
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MedicalRecords`
--

DROP TABLE IF EXISTS `MedicalRecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MedicalRecords` (
  `medical_records_no` int NOT NULL AUTO_INCREMENT,
  `record_date` date NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  UNIQUE KEY `medical_records_no` (`medical_records_no`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `medicalrecords_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medicalrecords_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicalRecords`
--

LOCK TABLES `MedicalRecords` WRITE;
/*!40000 ALTER TABLE `MedicalRecords` DISABLE KEYS */;
INSERT INTO `MedicalRecords` VALUES (1,'2023-11-15',1,1);
/*!40000 ALTER TABLE `MedicalRecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `medication_id` int NOT NULL AUTO_INCREMENT,
  `medication_name` varchar(32) NOT NULL,
  `medication_description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (1,'Acetaminophen','A pain reliever and a fever reducer, used to treat mild to moderate pain and to reduce fever.'),(2,'Ibuprofen','A nonsteroidal anti-inflammatory drug (NSAID), used to reduce fever and treat pain or inflammation.'),(3,'Amoxicillin','An antibiotic used to treat a wide variety of bacterial infections.'),(4,'Metformin','An oral diabetes medicine that helps control blood sugar levels.'),(5,'Amlodipine','Used to treat high blood pressure (hypertension) and to prevent chest pain (angina).'),(6,'Simvastatin','Used to lower cholesterol and triglycerides (types of fat) in the blood.'),(7,'Omeprazole','Used to treat certain stomach and esophagus problems (such as acid reflux, ulcers).'),(8,'Cetirizine','An antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing.');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `street` varchar(64) DEFAULT NULL,
  `city` varchar(16) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zipcode` char(5) DEFAULT NULL,
  `emergency_name` varchar(32) DEFAULT NULL,
  `emergency_phone` char(10) DEFAULT NULL,
  `username` varchar(32) NOT NULL,
  `biological_sex` enum('male','female') DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `username` (`username`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` VALUES (1,'John Doe','1990-01-01','3456789012','789 Circle Ave','Patienttown','NY','10001','Jane Doe','4567890123','johndoe','male'),(2,'Jane Doe','1992-02-02','4567890123','321 Square Blvd','Healthcity','FL','33101','John Doe','3456789012','janedoe','female');
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `medical_records_no` int NOT NULL,
  `patient_id` int NOT NULL,
  `medication_id` int NOT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `frequency` varchar(50) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  UNIQUE KEY `medical_records_no` (`medical_records_no`,`medication_id`,`patient_id`),
  KEY `medication_id` (`medication_id`),
  KEY `medical_records_no_2` (`medical_records_no`,`patient_id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`medication_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`medical_records_no`, `patient_id`) REFERENCES `MedicalRecords` (`medical_records_no`, `patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prescription_chk_1` CHECK ((`duration` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,1,1,'1 tablet','three times per day',3);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty` (
  `spe_id` int NOT NULL AUTO_INCREMENT,
  `spe_name` varchar(32) NOT NULL,
  `spe_discription` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`spe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
INSERT INTO `specialty` VALUES (1,'General Medicine','Provides primary healthcare services including diagnosis, treatment, and prevention of common illnesses and injuries.'),(2,'Pediatrics','Specializes in the medical care of infants, children, and adolescents.'),(3,'Cardiology','Focuses on diagnosing and treating diseases of the heart and blood vessels.'),(4,'Dermatology','Concerned with the diagnosis and treatment of skin disorders.'),(5,'Orthopedics','Specializes in the prevention, diagnosis, and treatment of disorders of the bones, joints, ligaments, tendons and muscles.'),(6,'Neurology','Deals with disorders of the nervous system including the brain and spinal cord.'),(7,'Gynecology','Focuses on women reproductive health and childbirth.'),(8,'Psychiatry','Specializes in the diagnosis, treatment, and prevention of mental illnesses and disorders.');
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `role` enum('patient','employee','manager') NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('adminuser','adminpass','manager','admin@example.com'),('drsmith','password123','employee','drsmith@example.com'),('janedoe','password123','patient','janedoe@example.com'),('johndoe','password123','patient','johndoe@example.com'),('nursejones','password123','employee','nursejones@example.com');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 22:07:43
