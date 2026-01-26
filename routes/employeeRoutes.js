/*
	routes/itemRoutes.js

	Tujuan file:
	- Menyediakan routing untuk operasi item (dashboard, tambah, edit, delete).

	Struktur:
	- Middleware `verifyToken` diaplikasikan ke seluruh router sehingga
		semua rute di bawah ini memerlukan autentikasi.
	- Route dan controller:
		GET  `/`           -> `itemController.getAll`
		GET  `/add`        -> `itemController.renderAdd` (form tambah)
		POST `/add`        -> `itemController.create` (buat item baru)
		GET  `/edit/:id`   -> `itemController.renderEdit` (form edit)
		POST `/edit/:id`   -> `itemController.update` (simpan perubahan)
		POST `/delete/:id` -> `itemController.softDelete` (soft delete hanya manager)

	Catatan keamanan:
	- Route-level role check tetap dilakukan di controller (mis. hanya `manager`
		yang boleh menambah/hapus).
*/

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken); // Proteksi semua route item

router.get('/', employeeController.getAll);
router.get('/add', employeeController.renderAdd);
router.post('/add', employeeController.create);
router.get('/edit/:id', employeeController.renderEdit);
router.post('/edit/:id', employeeController.update);
router.post('/delete/:id', employeeController.softDelete);

module.exports = router;