const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken); // Proteksi semua route item

router.get('/', itemController.getAll);
router.get('/add', itemController.renderAdd);
router.post('/add', itemController.create);
router.get('/edit/:id', itemController.renderEdit);
router.post('/edit/:id', itemController.update);
router.post('/delete/:id', itemController.softDelete);

module.exports = router;