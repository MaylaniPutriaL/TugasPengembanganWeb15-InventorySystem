/*
  models/user.js

  Tujuan file:
  - Mendefinisikan model Sequelize `User` untuk tabel `Users`.

  Field penting:
  - `username` : unik, digunakan untuk login dan pelacakan audit.
  - `password` : disimpan sebagai hash (bcrypt) — jangan simpan password plaintext.
  - `role` : ENUM yang menentukan hak akses (mis. 'manager' atau 'admin').

  Opsi model:
  - `timestamps: true` -> Sequelize menambahkan `createdAt` dan `updatedAt`.
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('manager', 'admin'), allowNull: false }
  }, { timestamps: true });
};