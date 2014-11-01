-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2014 at 10:32 AM
-- Server version: 5.5.32
-- PHP Version: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `getallinfo`
--
CREATE DATABASE IF NOT EXISTS `getallinfo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `getallinfo`;

-- --------------------------------------------------------

--
-- Table structure for table `accesslevel`
--

CREATE TABLE IF NOT EXISTS `accesslevel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `accesslevel`
--

INSERT INTO `accesslevel` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'Sales'),
(3, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `add`
--

CREATE TABLE IF NOT EXISTS `add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fromtimestamp` date NOT NULL,
  `totimestamp` date NOT NULL,
  `details` text NOT NULL,
  `deletestatus` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `add`
--

INSERT INTO `add` (`id`, `name`, `image`, `position`, `timestamp`, `fromtimestamp`, `totimestamp`, `details`, `deletestatus`) VALUES
(1, 'add', 'image.jpg', 2, '2014-10-18 12:49:35', '2014-10-18', '2014-10-19', 'demo details', 1),
(2, 'test image', 'logo_(2).png', 1, '2014-10-27 05:02:59', '2014-10-11', '2014-10-12', 'demo details', 1);

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE IF NOT EXISTS `billing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listing` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `paymenttype` int(11) NOT NULL,
  `amount` double NOT NULL,
  `period` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `payedto` int(11) NOT NULL,
  `deletestatus` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `billing`
--

INSERT INTO `billing` (`id`, `listing`, `user`, `timestamp`, `paymenttype`, `amount`, `period`, `credits`, `payedto`, `deletestatus`) VALUES
(1, 6, 7, '2014-10-18 06:52:17', 1, 20000, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parent`, `status`) VALUES
(4, 'medical', 0, 1),
(5, 'car', 0, 1),
(6, 'Honda', 5, 1),
(7, 'BMW', 5, 1),
(8, 'CIVIC', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorysubcategory`
--

CREATE TABLE IF NOT EXISTS `categorysubcategory` (
  `brandcategoryid` int(11) NOT NULL,
  `subcategoryid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorysubcategory`
--

INSERT INTO `categorysubcategory` (`brandcategoryid`, `subcategoryid`) VALUES
(4, 1),
(4, 2),
(1, 2),
(3, 1),
(3, 3),
(6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(4, 'Chennai1'),
(5, 'kalyan1'),
(6, 'thakurli'),
(7, 'dadar'),
(8, 'thane');

-- --------------------------------------------------------

--
-- Table structure for table `daysofoperation`
--

CREATE TABLE IF NOT EXISTS `daysofoperation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `daysofoperation`
--

INSERT INTO `daysofoperation` (`id`, `name`) VALUES
(1, 'sunday'),
(2, 'monday');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE IF NOT EXISTS `enquiry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `listing` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletestatus` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `enquiry`
--

INSERT INTO `enquiry` (`id`, `name`, `listing`, `email`, `phone`, `timestamp`, `deletestatus`) VALUES
(2, 'demo123', 0, '0', '0', '2014-10-18 12:02:06', 1),
(3, 'demo', 2, 'pratik@wohlig.com', '121221', '2014-10-27 08:48:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `eventlog`
--

CREATE TABLE IF NOT EXISTS `eventlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `eventlog`
--

INSERT INTO `eventlog` (`id`, `event`, `user`, `description`, `timestamp`) VALUES
(1, 1, 1, 'Event Created', '2014-05-12 10:46:24'),
(2, 1, 1, 'Event Edited', '2014-05-12 10:47:43'),
(3, 1, 1, 'Event Category ,Topic updated', '2014-05-12 11:16:19'),
(4, 1, 1, 'Event Category ,Topic updated', '2014-05-12 11:16:51'),
(5, 3, 3, 'Event Edited', '2014-08-08 08:45:13'),
(6, 3, 3, 'Mall Edited', '2014-08-08 08:47:08'),
(7, 3, 3, 'Mall Edited', '2014-08-08 08:47:32'),
(8, 3, 3, 'Mall Edited', '2014-08-08 08:52:55'),
(9, 3, 3, 'City Edited', '2014-08-08 10:00:26'),
(10, 3, 3, 'City Edited', '2014-08-08 10:01:10'),
(11, 4, 4, 'City Edited', '2014-08-08 10:03:23'),
(12, 8, 8, 'City Edited', '2014-08-09 05:28:14'),
(13, 8, 8, 'Location Edited', '2014-08-09 05:30:25'),
(14, 4, 4, 'Location Edited', '2014-08-09 05:30:40'),
(15, 11, 11, 'Location Edited', '2014-08-09 05:49:23'),
(16, 8, 8, 'Location Edited', '2014-08-09 05:50:01'),
(17, 3, 3, 'Brand Edited', '2014-08-09 06:32:06'),
(18, 3, 3, 'Brand Edited', '2014-08-09 06:32:26'),
(19, 3, 3, 'Brand Edited', '2014-08-09 09:57:03'),
(20, 8, 8, 'Location Edited', '2014-08-11 05:14:59'),
(21, 1, 1, 'Mall Edited', '2014-08-11 09:52:00'),
(22, 32, 32, 'Brand Edited', '2014-08-19 05:28:20'),
(23, 32, 32, 'Brand Edited', '2014-08-19 05:28:55'),
(24, 1, 1, 'City Edited', '2014-08-21 08:34:32'),
(25, 12, 12, 'Location Edited', '2014-08-21 08:36:11'),
(26, 2, 2, 'Mall Edited', '2014-08-21 10:40:28'),
(27, 2, 2, 'Mall Edited', '2014-08-21 10:40:59'),
(28, 4, 4, 'Mall Edited', '2014-08-21 11:45:56'),
(29, 4, 4, 'Mall Edited', '2014-08-21 11:46:36'),
(30, 4, 4, 'Mall Edited', '2014-08-21 11:47:39'),
(31, 4, 4, 'Mall Edited', '2014-08-21 11:47:55'),
(32, 4, 4, 'Mall Edited', '2014-08-21 11:48:19'),
(33, 13, 13, 'Location Edited', '2014-08-21 12:12:46'),
(34, 13, 13, 'Location Edited', '2014-08-21 12:13:09'),
(35, 8, 8, 'Location Edited', '2014-08-22 05:52:40'),
(36, 6, 6, 'Mall Edited', '2014-09-11 10:30:43'),
(37, 2, 2, 'Mall Edited', '2014-09-11 10:39:43'),
(38, 1, 1, 'Mall Edited', '2014-09-11 10:40:17'),
(39, 6, 6, 'Mall Edited', '2014-09-11 10:48:17'),
(40, 1, 1, 'Mall Edited', '2014-09-18 08:22:15'),
(41, 1, 1, 'Mall Edited', '2014-09-18 08:22:30'),
(42, 1, 1, 'Mall Edited', '2014-09-18 08:22:45'),
(43, 7, 7, 'Mall Edited', '2014-09-25 05:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

CREATE TABLE IF NOT EXISTS `listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `long` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` int(11) NOT NULL,
  `pincode` varchar(50) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `contactno` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL,
  `googleplus` varchar(255) NOT NULL,
  `yearofestablishment` int(11) NOT NULL,
  `timeofoperation_start` varchar(255) NOT NULL,
  `timeofoperation_end` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `isverified` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `deletestatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `listing`
--

INSERT INTO `listing` (`id`, `name`, `user`, `lat`, `long`, `address`, `city`, `pincode`, `state`, `country`, `description`, `logo`, `contactno`, `email`, `website`, `facebook`, `twitter`, `googleplus`, `yearofestablishment`, `timeofoperation_start`, `timeofoperation_end`, `type`, `credits`, `isverified`, `video`, `deletestatus`) VALUES
(1, 'demo', 7, '43', '324', 'eeferfv', 0, '0', 'jeq', 'qeq', 'qqe', 'qeqq', '31131', 'a@a.com', 'demo', '', '', '', 2004, '10 AM', '6 PM', 1, 23, 1, 'acac', 1),
(2, 'demo', 7, '43', '324', 'eeferfv', 1, '0', 'jeq', 'qeq', 'qqe', 'qeqq', '31131', 'a@a.com', 'demo', '', '', '', 2004, '10 AM', '6 PM', 1, 23, 1, 'acac', 1),
(3, 'demo', 7, '0.7', '12333', 'abcdefg', 0, '410201', 'demo', 'demo', 'dsc', '', '888888', 'pratik@wohlig.com', 'website', '2', 'twpage', 'a', 2013, '10AM', '6PM', 0, 21, 1, 'dmeo', 1),
(6, 'test123', 4, '121314', '12333', 'abcdefg', 5, '200001', 'qdqw', 'demo', 'demo', 'Logo_(1).png', '888888', 'avinashghare572@gmail.com', 'a.com', '1', 'twpage', 'a', 2013, '10AM', '6PM', 0, 10, 1, 'dmeo', 1),
(7, 'demo', 4, '0.7', '12333', 'demo', 4, '200001', 'Maharashtra', 'India', 'demo', '', '2232', 'pratik@wohlig.com', 'a.com', '0', 'twpage', 'a', 2013, '10AM', '6PM', 1, 10, 1, 'dmeo', 1),
(8, 'demo', 4, '0.7', '12333', 'demo', 4, '200001', 'Maharashtra', 'India', 'demo', '', '2232', 'pratik@wohlig.com', 'a.com', '0', 'twpage', 'a', 2013, '10AM', '6PM', 1, 10, 1, 'dmeo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `listingcategory`
--

CREATE TABLE IF NOT EXISTS `listingcategory` (
  `listing` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`listing`,`category`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listingcategory`
--

INSERT INTO `listingcategory` (`listing`, `category`) VALUES
(6, 4),
(7, 4),
(7, 5),
(8, 4),
(8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `listingdaysofoperation`
--

CREATE TABLE IF NOT EXISTS `listingdaysofoperation` (
  `listing` int(11) NOT NULL,
  `daysofoperation` int(11) NOT NULL,
  PRIMARY KEY (`listing`,`daysofoperation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listingdaysofoperation`
--

INSERT INTO `listingdaysofoperation` (`listing`, `daysofoperation`) VALUES
(6, 1),
(7, 1),
(7, 2),
(8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `listingimage`
--

CREATE TABLE IF NOT EXISTS `listingimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listing` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `listingimages`
--

CREATE TABLE IF NOT EXISTS `listingimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listing` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `listingimages`
--

INSERT INTO `listingimages` (`id`, `listing`, `image`, `order`, `timestamp`) VALUES
(5, 1, 'logo_(2)2.png', 1, '2014-10-27 10:50:07'),
(6, 2, 'Logo_(1)1.png', 9, '2014-10-27 10:43:01'),
(7, 3, 'logo_(2)3.png', 1, '2014-10-27 09:50:15'),
(8, 1, 'image_(1)1.png', 2, '2014-10-27 10:03:10'),
(9, 1, 'Logo_(1)2.png', 3, '2014-10-27 10:03:33'),
(10, 7, 'Logo_(1)3.png', 6, '2014-10-28 05:38:42');

-- --------------------------------------------------------

--
-- Table structure for table `listingmodeofpayment`
--

CREATE TABLE IF NOT EXISTS `listingmodeofpayment` (
  `listing` int(11) NOT NULL,
  `modeofpayment` int(11) NOT NULL,
  PRIMARY KEY (`listing`,`modeofpayment`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listingmodeofpayment`
--

INSERT INTO `listingmodeofpayment` (`listing`, `modeofpayment`) VALUES
(6, 1),
(7, 1),
(7, 2),
(8, 1),
(8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cityid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pincode` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `cityid`, `name`, `pincode`) VALUES
(1, 4, 'east', 0),
(2, 2, 'west', 0),
(4, 4, 'avi1', 0),
(7, 4, 'demo', 0),
(8, 4, 'abcdef', 0),
(9, 2, 'abcdefg', 0),
(10, 4, 'bandra', 0),
(11, 1, 'Dadar1', 0),
(12, 1, 'Ghatkopar (west)', 0),
(13, 4, 'test123', 410200),
(14, 4, 'demo', 123),
(15, 4, 'abcdmmm', 1234567),
(16, 6, 'wwweeesssttt', 0);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `linktype` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `isactive` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `description`, `keyword`, `url`, `linktype`, `parent`, `isactive`, `order`, `icon`) VALUES
(1, 'Users', '', '', 'site/viewusers', 1, 0, 1, 1, 'icon-user'),
(2, 'Listing', '', '', 'site/viewlisting', 1, 0, 1, 2, ' icon-calendar'),
(3, 'City', '', '', 'site/viewcity', 1, 0, 1, 6, ' icon-user-md'),
(4, 'Dashboard', '', '', 'site/index', 1, 0, 1, 0, 'icon-dashboard'),
(5, 'Mode Of Payment', '', '', 'site/viewmodeofpayment', 1, 0, 1, 4, ' icon-ticket'),
(6, 'Enquiry', '', '', 'site/viewenquiry', 1, 0, 1, 5, 'icon-money'),
(7, 'Category', '', '', 'site/viewcategory', 1, 0, 1, 3, 'icon-book'),
(8, 'Special Offers', '', '', 'site/viewspecialoffer', 1, 0, 1, 7, ' icon-file-text-alt'),
(9, 'Payment Type', '', '', 'site/viewpaymenttype', 1, 0, 1, 8, ' icon-list-alt'),
(10, 'Billing', '', '', 'site/viewbilling', 1, 0, 1, 9, 'icon-user'),
(11, 'Position', '', '', 'site/viewposition', 1, 0, 1, 10, 'icon-user'),
(12, 'Adds', '', '', 'site/viewadd', 1, 0, 1, 11, 'icon-user');

-- --------------------------------------------------------

--
-- Table structure for table `menuaccess`
--

CREATE TABLE IF NOT EXISTS `menuaccess` (
  `menu` int(11) NOT NULL,
  `access` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menuaccess`
--

INSERT INTO `menuaccess` (`menu`, `access`) VALUES
(1, 1),
(4, 1),
(2, 1),
(3, 1),
(5, 1),
(6, 1),
(7, 1),
(7, 3),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `modeofpayment`
--

CREATE TABLE IF NOT EXISTS `modeofpayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deletestatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `modeofpayment`
--

INSERT INTO `modeofpayment` (`id`, `name`, `deletestatus`) VALUES
(1, 'cash', 1),
(2, 'debit card', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paymenttype`
--

CREATE TABLE IF NOT EXISTS `paymenttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deletestatus` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `paymenttype`
--

INSERT INTO `paymenttype` (`id`, `name`, `deletestatus`) VALUES
(1, 'cash', 1);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE IF NOT EXISTS `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `deletestatus` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `name`, `width`, `height`, `deletestatus`) VALUES
(1, 'top', 100, 100, 1),
(2, 'bottom', 200, 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `specialoffer`
--

CREATE TABLE IF NOT EXISTS `specialoffer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletestatus` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `specialoffer`
--

INSERT INTO `specialoffer` (`id`, `name`, `category`, `email`, `phone`, `timestamp`, `deletestatus`) VALUES
(1, 'demo123', 4, 'demo@demo.com', '987654', '2014-10-17 13:53:15', 1),
(2, 'demo', 4, 'a@a.com', '0987654', '2014-10-17 13:53:24', 1),
(3, 'Celerio', 5, 'pratik@wohlig.com', '121221', '2014-10-27 07:44:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `specialofferlisting`
--

CREATE TABLE IF NOT EXISTS `specialofferlisting` (
  `specialoffer` int(11) NOT NULL,
  `listing` int(11) NOT NULL,
  PRIMARY KEY (`specialoffer`,`listing`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specialofferlisting`
--

INSERT INTO `specialofferlisting` (`specialoffer`, `listing`) VALUES
(3, 1),
(3, 3),
(3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` text,
  `city` varchar(255) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `accesslevel` int(11) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `facebookuserid` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `phoneno` varchar(50) NOT NULL,
  `google` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `deletestatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `password`, `email`, `website`, `contact`, `address`, `city`, `pincode`, `dob`, `accesslevel`, `timestamp`, `facebookuserid`, `status`, `photo`, `phoneno`, `google`, `state`, `country`, `deletestatus`) VALUES
(1, 'wohlig', '', 'a63526467438df9566c508027d9cb06b', 'wohlig@wohlig.com', '', '233232', 'dadar', 'Mumbai', 322323, '1991-01-08', 1, '0000-00-00 00:00:00', '0', 1, NULL, '', '', '', '', 1),
(4, 'pratik', 'shah', '0cb2b62754dfd12b6ed0161d4b447df7', 'pratik@wohlig.com', '', '8080209455', 'mulund', 'Mumbai', 400080, '1991-07-01', 1, '2014-05-12 06:52:44', '', 1, NULL, '', '', '', '', 1),
(5, 'wohlig123', 'tech', 'wohlig123', 'wohlig1@wohlig.com', 'www.wohlig.com', '8989898989', 'abcdefg', 'mumbai', 200001, '1991-01-08', 1, '2014-05-12 06:52:44', '2', 1, NULL, '', '', '', '', 1),
(6, 'wohlig1', 'tech', 'a63526467438df9566c508027d9cb06b', 'wohlig2@wohlig.com', 'wohlig.com', '8989898989', 'abcdefg', 'mumbai', 200001, '1991-01-08', 1, '2014-05-12 06:52:44', '2', 1, NULL, '', '', '', '', 1),
(7, 'Avinash', 'Ghare', '7b0a80efe0d324e937bbfc7716fb15d3', 'avinash@wohlig.com', 'demo', '9876543210', 'karjat raigad', 'karjat', 410201, '1991-06-05', 1, '2014-10-17 06:22:29', '1', 1, NULL, '0222898989', 'yutvbnjy', 'Maharashtra', 'India', 1);

-- --------------------------------------------------------

--
-- Table structure for table `userlog`
--

CREATE TABLE IF NOT EXISTS `userlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `onuser` int(11) NOT NULL,
  `fromuser` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `userlog`
--

INSERT INTO `userlog` (`id`, `onuser`, `fromuser`, `description`, `timestamp`) VALUES
(1, 1, 1, 'User Address Edited', '2014-05-12 06:50:21'),
(2, 1, 1, 'User Details Edited', '2014-05-12 06:51:43'),
(3, 1, 1, 'User Details Edited', '2014-05-12 06:51:53'),
(4, 4, 1, 'User Created', '2014-05-12 06:52:44'),
(5, 4, 1, 'User Address Edited', '2014-05-12 12:31:48'),
(6, 23, 2, 'User Created', '2014-10-07 06:46:55'),
(7, 24, 2, 'User Created', '2014-10-07 06:48:25'),
(8, 25, 2, 'User Created', '2014-10-07 06:49:04'),
(9, 26, 2, 'User Created', '2014-10-07 06:49:16'),
(10, 27, 2, 'User Created', '2014-10-07 06:52:18'),
(11, 28, 2, 'User Created', '2014-10-07 06:52:45'),
(12, 29, 2, 'User Created', '2014-10-07 06:53:10'),
(13, 30, 2, 'User Created', '2014-10-07 06:53:33'),
(14, 31, 2, 'User Created', '2014-10-07 06:55:03'),
(15, 32, 2, 'User Created', '2014-10-07 06:55:33'),
(16, 33, 2, 'User Created', '2014-10-07 06:59:32'),
(17, 34, 2, 'User Created', '2014-10-07 07:01:18'),
(18, 35, 2, 'User Created', '2014-10-07 07:01:50'),
(19, 34, 2, 'User Details Edited', '2014-10-07 07:04:34'),
(20, 18, 2, 'User Details Edited', '2014-10-07 07:05:11'),
(21, 18, 2, 'User Details Edited', '2014-10-07 07:05:45'),
(22, 18, 2, 'User Details Edited', '2014-10-07 07:06:03'),
(23, 7, 6, 'User Created', '2014-10-17 06:22:29'),
(24, 7, 6, 'User Details Edited', '2014-10-17 06:32:22'),
(25, 7, 6, 'User Details Edited', '2014-10-17 06:32:37');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
