-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Bulan Mei 2022 pada 00.57
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_node`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `name_admin` varchar(250) NOT NULL,
  `img_admin` varchar(250) DEFAULT NULL,
  `address_admin` varchar(250) DEFAULT NULL,
  `level_admin` varchar(250) DEFAULT NULL,
  `gender_admin` enum('P','L') DEFAULT NULL,
  `age_admin` int(11) DEFAULT NULL,
  `phone_admin` varchar(100) DEFAULT NULL,
  `email_admin` varchar(100) NOT NULL,
  `password_admin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `name_admin`, `img_admin`, `address_admin`, `level_admin`, `gender_admin`, `age_admin`, `phone_admin`, `email_admin`, `password_admin`) VALUES
(5, 'Vania', '', 'Jakarta', 'Admin', 'P', 18, '081990110228', 'vania@gmail.com', '9acd74c1a83b923509d58c3f20c5b8fc'),
(7, 'aizar', NULL, 'Blitar', 'Admin', 'P', 0, '', 'aizar@gmail.com', '26425205882d292da06b0063a4d081ce');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `name` varchar(50) NOT NULL,
  `image` varchar(256) NOT NULL,
  `description` varchar(500) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`name`, `image`, `description`, `id_category`) VALUES
('Coding Class', 'img-1649368995742.jpg', 'Provide various levels of programming that are mentored by experienced mentors with the aim of preparing users to become reliable programmers and get international certificates', 2),
('Video Editing Class', 'img-1649369067965.jpg', 'Provide various levels of editing that are mentored by experienced mentors with the aim of preparing users to become reliable editors and get international certificates', 3),
('GameDev Class', 'img-1649369125757.jpg', 'Provide various materials on game development that are guided by experienced mentors with the aim of preparing users to become reliable game developer', 4),
('Graphic Design Class', 'img-1649369194424.jpg', 'Providing various levels of design that are guided by experienced mentors with the aim of preparing users to become reliable designers and get international certificates', 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE `class` (
  `id_class` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `name_class` varchar(200) NOT NULL,
  `image_class` varchar(299) NOT NULL,
  `description_class` text NOT NULL,
  `price` double NOT NULL,
  `link_class` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`id_class`, `id_category`, `name_class`, `image_class`, `description_class`, `price`, `link_class`) VALUES
(1, 3, 'Introduction to Basic Editing Using Filmora', 'img-1649380180883.jpg', 'Basic video editing course using the easy and simple Filmora application. This is for those of you who are new to the world of video editing and want to learn basic video editing', 100000, 'https://tech-course.webex.com/meet/basic-filmora'),
(2, 3, 'Advanced Editing Video Using Adobe Premiere Pro', 'img-1649380301754.jpg', 'Advanced video editing course using Adobe Premiere Pro application. This is for those of you who want to explore the world of video editing more professionally and expertly', 250000, 'https://tech-course.webex.com/meet/advanced-ap'),
(3, 4, 'Introduction to Basic 3D Modeling Using Blender 3D', 'img-1649380907083.jpg', 'Basic 3D Modeling course using Blender 3D software. Suitable for those of you who want to explore 3d modeling', 300000, 'https://tech-course.webex.com/meet/basic-blender3d'),
(4, 5, 'Introduction to Design UI/UX using Figma', 'img-1649380803831.jpg', 'basic to learn UI/UX design easily using Figma. suitable for beginners who are interested in UI/UX design and start making portfolios', 150000, 'https://tech-course.webex.com/meet/uiux-figma'),
(6, 2, 'Introduction to Basic Vue Js', 'img-1649379885845.jpg', 'Basic frontend course with Javascript programming language and Vue Js framework. Devoted to users who want to focus experts on creating user interfaces and single-page applications (SPA).\r\n', 500000, 'https://tech-course.webex.com/meet/basic-vue'),
(7, 2, 'Swift IOS Web Development', 'img-1649379978873.jpg', 'Software development course using the Swift programming language. Facilitate users who want to focus expert on creating application with iOS and OS X development', 400000, 'https://tech-course.webex.com/meet/swift-ios-dev'),
(8, 2, 'App Development with React Js', 'img-1649380061869.jpg', 'Application development courses using Javascript and React JS. Provides for users who want to explore and focus the creation of user interface of a website using Framework React Js.\r\n', 300000, 'https://tech-course.webex.com/meet/react-js-dev'),
(9, 5, 'Basic Design using Adobe Illustrator', 'img-1649380730048.jpg', 'Suitable for users who are interested in the field of design using adobe illustrator from basic to advanced', 200000, 'https://tech-course.webex.com/meet/ai-design'),
(10, 4, 'Intermediate Game Development With Unity Engine', 'img-1649381002693.jpg', 'Intermediate Game Development course with Unity engine. Suitable for those of you who want to become a more professional game developer', 200000, 'https://tech-course.webex.com/meet/unity-gamedev');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detailtransaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detailtransaksi`, `id_transaksi`, `id_class`) VALUES
(83, 79, 1),
(84, 79, 2),
(85, 80, 6),
(86, 80, 8),
(87, 81, 3),
(88, 82, 10),
(89, 83, 6),
(90, 83, 7),
(91, 84, 1),
(92, 84, 2),
(94, 85, 7),
(93, 85, 8);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tanggal_transaksi` date NOT NULL,
  `nomor_transaksi` varchar(100) DEFAULT NULL,
  `status_transaksi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_user`, `tanggal_transaksi`, `nomor_transaksi`, `status_transaksi`) VALUES
(79, 4, '2022-04-19', '96893111431350450', 'LUNAS'),
(80, 4, '2022-04-20', '48232383263549176', 'LUNAS'),
(81, 4, '2022-04-25', '40605184937800010', 'LUNAS'),
(82, 4, '2022-04-25', '28292628165183630', 'LUNAS'),
(83, 9, '2022-05-01', '92903668675819580', 'LUNAS'),
(84, 9, '2022-05-10', '46084474786401740', 'LUNAS'),
(85, 10, '2022-05-10', '92809819376841890', 'LUNAS');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(200) NOT NULL,
  `img_user` varchar(200) DEFAULT NULL,
  `level_user` varchar(10) DEFAULT NULL,
  `gender_user` enum('P','L','','') DEFAULT NULL,
  `phone_user` varchar(200) DEFAULT NULL,
  `address_user` varchar(100) DEFAULT NULL,
  `age_user` int(11) DEFAULT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `name_user`, `img_user`, `level_user`, `gender_user`, `phone_user`, `address_user`, `age_user`, `email_user`, `password_user`) VALUES
(4, 'Elia ', '', 'User', 'P', '089112003455', 'Blitar', 17, 'elia@gmail.com', 'c79a51f886fcde9148989e84002e64e5'),
(8, 'Cessalya D.', NULL, 'User', 'P', '082335162060', 'Malang', 17, 'cessa@gmail.com', '48891387642d380dfd5081daf062feb5'),
(9, 'Caca', 'img-1650283959856.jpeg', 'User', 'P', '081771990228', 'Malang', 22, 'caca@gmail.com', '35b9ec4b629b2aee42b6158e5f65bb79'),
(10, 'Fadilla', 'img-1652190026852.jpeg', 'User', 'P', '083660107811', 'Surabaya', 17, 'fadilla@gmail.com', 'ca851686ebd82b391fc6a13153a453cd');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indeks untuk tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`),
  ADD KEY `id_category` (`id_category`);

--
-- Indeks untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detailtransaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`,`id_class`),
  ADD KEY `id_class` (`id_class`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detailtransaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Ketidakleluasaan untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_class`);

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
