# Penjelasan untuk config/config.json

File `config.json` menyimpan konfigurasi koneksi database yang dipakai oleh
Sequelize. Formatnya mengikuti struktur environment (mis. `development`).

Contoh isi saat ini:

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "inventory_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```

Penjelasan variabel:
- `username` : nama user DB
- `password` : password DB (null berarti kosong)
- `database` : nama database
- `host`     : host MySQL (localhost/127.0.0.1)
- `dialect`  : jenis DB (mysql, postgres, sqlite, dll)
- `logging`  : aktifkan logging SQL (true/false)

Catatan:
- JSON tidak mendukung komentar inline, oleh karena itu penjelasan
  ditempatkan di file Markdown terpisah ini agar `config.json` tetap
  valid untuk Sequelize.
- Untuk deployment/production, lebih aman menggunakan variabel lingkungan
  agar kredensial tidak disimpan dalam repo.
