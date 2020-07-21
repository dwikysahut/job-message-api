-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 21 Jul 2020 pada 17.01
-- Versi server: 10.1.30-MariaDB
-- Versi PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_board_api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_message`
--

CREATE TABLE `job_message` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  `isClaimed` varchar(10) NOT NULL DEFAULT 'false',
  `salary` int(255) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `job_message`
--

INSERT INTO `job_message` (`id`, `user_id`, `name`, `location`, `availability`, `isClaimed`, `salary`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'programmer', 'malang', 'yes', 'false', 2000, '2020-07-20 21:10:28', '2020-07-21 14:36:09'),
(2, NULL, 'web developer', 'malang', 'yes', 'false', 1500, '2020-07-20 21:21:04', '2020-07-21 14:32:18'),
(3, NULL, 'Civil Engineering', 'Kalimantan Timur', 'yes', 'false', 2100, '2020-07-20 21:51:51', '2020-07-21 11:00:07'),
(4, NULL, 'mobile developer', 'malang', 'yes', 'false', 1600, '2020-07-20 21:52:14', '2020-07-21 14:32:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  `other_appointment` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `location`, `availability`, `other_appointment`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 'dwikysahut', '$2b$10$1NiU5dIu/AbqA4wx7oWqJuwvINzVxpq3JvOX/gx3c4wfhpvYT8gB2', 'malang', 'yes', 'none', '7', '2020-07-20 16:40:15', '2020-07-20 16:40:15'),
(2, 'dwikysahut2', '$2b$10$HWA7q2p2EsPdlMXpo5OJ/edoosHlvs9yu.WAEh.0y1nCZP0EZMXg2', 'malang', 'yes', 'none', '7', '2020-07-20 12:39:22', '2020-07-21 16:02:07');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `job_message`
--
ALTER TABLE `job_message`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `job_message`
--
ALTER TABLE `job_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
