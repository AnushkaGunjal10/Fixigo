-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2026 at 10:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fixigo`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `mechanic_id` int(11) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `booking_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `user_id`, `mechanic_id`, `service`, `status`, `booking_date`, `booking_time`) VALUES
(1, 1, 1, 'Engine', 'Accepted', NULL, NULL),
(2, 0, 0, '', 'Pending', NULL, NULL),
(3, 1, 1, 'General Service', 'Accepted', NULL, NULL),
(4, 0, 0, '', 'Pending', NULL, NULL),
(5, 1, 1, 'General Service', 'Accepted', NULL, NULL),
(6, 0, 0, '', 'Pending', NULL, NULL),
(7, 1, 2, 'General Service', 'Pending', NULL, NULL),
(8, 0, 0, '', 'Pending', NULL, NULL),
(9, 3, 1, 'Engine Repair', 'Accepted', NULL, NULL),
(10, 0, 0, '', 'Pending', '0000-00-00', '00:00:00'),
(11, 5, 11, 'Battery Issue', 'Pending', '2026-04-08', '03:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `mechanics`
--

CREATE TABLE `mechanics` (
  `mechanic_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `availability` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `experience` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mechanics`
--

INSERT INTO `mechanics` (`mechanic_id`, `name`, `phone`, `location`, `availability`, `email`, `password`, `latitude`, `longitude`, `rating`, `experience`) VALUES
(1, 'Raj Mechanic', '9876543210', 'Pune', 'Available', 'raj@gmail.com', '123', 18.5204, 73.8567, 4.5, 5),
(2, 'Amit Garage', '9123456780', 'Pimpri', 'Available', 'amit@gmail.com', '123', 18.6298, 73.7997, 4.2, 4),
(3, 'SpeedFix Auto', '9988776655', 'Hinjewadi', 'Busy', 'speedfix@gmail.com', '123', 18.5912, 73.7389, 4, 3),
(7, 'Turbo Motors', '9871234560', 'Baner', 'Available', 'turbo@gmail.com', '123', 18.559, 73.7868, 4.3, 6),
(8, 'City Auto Care', '9765432109', 'Shivajinagar', 'Available', 'cityauto@gmail.com', '123', 18.5314, 73.8446, 4.6, 5),
(9, 'Rapid Repair Hub', '9090909090', 'Wakad', 'Available', 'rapid@gmail.com', '123', 18.5975, 73.7898, 4.1, 4),
(10, 'Express Mechanics', '9012345678', 'Kothrud', 'Busy', 'express@gmail.com', '123', 18.5074, 73.8077, 3.9, 3),
(11, 'AutoFix Pro', '8899776655', 'Hadapsar', 'Available', 'autofix@gmail.com', '123', 18.5089, 73.926, 4.4, 6),
(12, 'Prime Garage', '9345678901', 'Aundh', 'Available', 'prime@gmail.com', '123', 18.5585, 73.8077, 4.7, 7),
(13, 'Quick Service Point', '9870011223', 'Viman Nagar', 'Available', 'quick@gmail.com', '123', 18.5679, 73.9143, 4.2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`) VALUES
(1, 0, 'Your booking status is now ', 0),
(2, 1, 'Your booking status is now Accepted', 0),
(3, 1, 'Your booking status is now Accepted', 0),
(4, 1, 'Your booking status is now Accepted', 0),
(5, 3, 'Your booking status is now Accepted', 0);

-- --------------------------------------------------------

--
-- Table structure for table `problems`
--

CREATE TABLE `problems` (
  `problem_id` int(11) NOT NULL,
  `problem` varchar(255) DEFAULT NULL,
  `solution` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problems`
--

INSERT INTO `problems` (`problem_id`, `problem`, `solution`) VALUES
(1, 'Engine not starting', 'Check battery, fuel level, and starter motor'),
(2, 'Tyre puncture', 'Replace tyre or use puncture kit'),
(3, 'Overheating', 'Check coolant level and radiator'),
(4, 'Brake issue', 'Check brake fluid and brake pads');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `mechanic_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) DEFAULT NULL,
  `price_range` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `price_range`) VALUES
(1, 'Engine Repair', '₹1500 - ₹3000'),
(2, 'Tyre Puncture', '₹300 - ₹800'),
(3, 'Brake Service', '₹500 - ₹1200'),
(4, 'Oil Change', '₹400 - ₹1000'),
(5, 'Battery Check', '₹200 - ₹500');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
(1, 'Anushka', 'anushkagunjal10@gmail.com', '123456'),
(3, 'Sakshi Jain', 'sakshi@gmail.com', '123456'),
(4, '', '', ''),
(5, 'Omkar Shetty', 'omi@gmail.com', 'Omi123');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_name` varchar(100) DEFAULT NULL,
  `vehicle_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `mechanics`
--
ALTER TABLE `mechanics`
  ADD PRIMARY KEY (`mechanic_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `problems`
--
ALTER TABLE `problems`
  ADD PRIMARY KEY (`problem_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `mechanics`
--
ALTER TABLE `mechanics`
  MODIFY `mechanic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `problems`
--
ALTER TABLE `problems`
  MODIFY `problem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
