/*
  controllers/authController.js

  Tujuan file:
  - Menangani proses autentikasi pengguna: menampilkan form login,
   memverifikasi kredensial, membuat JWT, dan melakukan logout.

  Fungsi utama:
  - `renderLogin(req, res)` : Merender halaman login (EJS) dengan
    parameter `error` (null jika tidak ada error).
  - `login(req, res)` : Menerima `username` dan `password` dari body,
    mencari pengguna di database, membandingkan password dengan bcrypt.
    Jika berhasil, membuat JWT dengan payload `{ username, role }`
    dan mengirimkan cookie HTTP-only bernama `token`. Jika gagal,
    merender kembali halaman login dengan pesan error.
  - `logout(req, res)` : Menghapus cookie `token` dan mengarahkan ke
    halaman login.

  Catatan keamanan & implementasi:
  - JWT secret diambil dari `process.env.JWT_SECRET`.
  - Token disetel dengan `httpOnly: true` untuk mencegah akses via JS.
  - Password disimpan dalam bentuk hash (bcrypt) di database.
*/

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.renderLogin = (req, res) => res.render('login', { error: null });

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { username: user.username, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/');
  }
  res.render('login', { error: 'Username atau Password salah!' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};