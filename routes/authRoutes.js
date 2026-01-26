/*
	routes/authRoutes.js

	Tujuan file:
	- Menyediakan endpoint routing untuk autentikasi (login, logout).

	Rute yang tersedia:
	- GET  /auth/login  -> menampilkan halaman login
	- POST /auth/login  -> melakukan proses login (membuat JWT, set cookie)
	- GET  /auth/logout -> membersihkan cookie dan mengarahkan ke login

	Catatan:
	- Logika utama ada di `controllers/authController.js`.
*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;