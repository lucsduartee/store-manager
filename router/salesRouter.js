const express = require('express');
const Sales = require('../controllers/Sales');

const router = express.Router();

router.post('/', Sales.create);
router.get('/', Sales.getAll);
router.get('/:id', Sales.getById);

module.exports = router;
