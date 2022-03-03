const express = require('express');
const Products = require('../controllers/Products');

const router = express.Router();

router.post('/', Products.create);
router.get('/', Products.getAllProducts);
router.get('/:id', Products.getById);
router.put('/:id', Products.update);
router.delete('/:id', Products.deleteProduct);

module.exports = router;
