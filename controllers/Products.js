const rescue = require('express-rescue');
const Products = require('../services/Products');

const create = rescue(async (req, res, next) => {
  const product = req.body;
  const result = await Products.create(product);
  if (result.message) {
    return next(result);
  }
  res.status(201).json(result);
});

const getAllProducts = rescue(async (_req, res, next) => {
  const allProducts = await Products.getAll();

  if (allProducts.length === 0) return next(allProducts);

  res.status(200).json(allProducts);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.getById(id);
  if (product.message) return next(product);

  res.status(200).json(product);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  const productUpdated = await Products.updateProduct(id, product);
  if (productUpdated.message) return next(productUpdated);

  res.status(200).json(productUpdated);
});

const deleteProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const productDeleted = await Products.deleteProduct(id);
  if (productDeleted.message) return next(productDeleted);

  res.status(200).json(productDeleted);
});

module.exports = {
  create,
  getAllProducts,
  getById,
  update,
  deleteProduct,
};
