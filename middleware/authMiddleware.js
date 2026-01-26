/*
  middleware/authMiddleware.js

  Tujuan file:
  - Middleware proteksi route yang memverifikasi keberadaan dan validitas
    JWT yang tersimpan di cookie `token`.

  Cara kerja:
  - Mengambil cookie `token`. Jika tidak ada -> redirect ke `/auth/login`.
  - Memverifikasi token dengan `jwt.verify(token, process.env.JWT_SECRET)`.
  - Jika valid: menyimpan payload ke `req.user` dan `res.locals.user`
    (agar tersedia di EJS), lalu memanggil `next()`.
  - Jika tidak valid: membersihkan cookie dan redirect ke login.

  Catatan keamanan:
  - Middleware ini hanya memeriksa token, bukan hak akses (role). Untuk
    pemeriksaan role, lakukan di controller atau middleware tambahan.
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded; // Tersedia untuk EJS
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }
};