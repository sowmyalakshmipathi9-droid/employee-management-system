-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 03, 2026 at 07:45 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE IF NOT EXISTS `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `create_at`) VALUES
(1, 'Human Resources', '2026-07-25 15:46:34'),
(2, 'Information Technology', '2026-07-25 15:46:34'),
(3, 'Finance', '2026-07-25 15:46:34'),
(4, 'Marketing', '2026-07-25 15:46:34'),
(5, 'Sales', '2026-07-25 15:46:34');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_code` (`employee_code`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_code`, `first_name`, `last_name`, `email`, `phone`, `department_id`, `designation`, `salary`, `joining_date`, `profile_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'EMP2026001', 'Sowmya', 'Lakshmipathi', 'sonusowmya343@gmail.com', '8792388725', 2, 'Software Engineer', '1200000.00', '2022-07-20', NULL, 'Active', '2026-07-27 06:47:14', '2026-07-27 06:47:14'),
(2, 'EMP2026002', 'Indira', 'Lakshmipathi', 'indira.lakshmipathi@gmail.com', '8553073750', 5, 'Associate', '1500000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:30:46', '2026-07-27 10:56:03'),
(3, 'EMP2026003', 'Saroja', 'Lakshmipathi', 'saroja.lakhsmipathi@gmail.com', '8050975295', 5, 'Software Engineer', '2000000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:00', '2026-07-27 10:31:00'),
(4, 'EMP2026004', 'Indira', 'Praveen', 'indira.praveen@gmail.com', '9876512340', 4, 'Software Engineer', '1100000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:10', '2026-07-27 10:31:10'),
(5, 'EMP2026005', 'Praveen', 'Sharon', 'praveen.sharon@gmail.com', '6543216789', 3, 'Software Engineer', '1200000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:19', '2026-07-27 10:31:19'),
(6, 'EMP2026006', 'Sandeep', 'Rao', 'sandeep.rao@gmail.com', '6765890432', 4, 'Software Engineer', '1250000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:31', '2026-07-27 10:31:31'),
(7, 'EMP2026007', 'Sudarshan', 'Gowda', 'sudarshan.gowda@gmail.com', '9876123546', 3, 'Software Engineer', '1500000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:43', '2026-07-27 10:31:43'),
(8, 'EMP2026008', 'Damodar', 'Rao', 'damodar.rao@gmail.com', '8787878787', 2, 'Software Engineer', '1400000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:31:55', '2026-07-27 10:31:55'),
(9, 'EMP2026009', 'Ullas', 'Gowda', 'ullasgowda@gmail.com', '5767568787', 1, 'Software Engineer', '1400000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:32:10', '2026-07-27 10:32:10'),
(10, 'EMP20260010', 'Saraswathi', 'vilas', 'saraswathi.v@gmail.com', '9867865544', 1, 'Software Engineer', '2500000.00', '2022-07-20', NULL, 'Active', '2026-07-27 10:32:19', '2026-07-27 10:32:19');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
