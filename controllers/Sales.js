const rescue = require('express-rescue');
const Sales = require('../services/Sales');

const create = rescue(async (req, res, next) => {
  const sales = req.body;
  const salesCreated = await Sales.create(sales);
  if (salesCreated.message) return next(salesCreated);

  res.status(201).json(salesCreated);
});

const getAll = rescue(async (_req, res, _next) => {
  const sales = await Sales.getAll();

  res.status(200).json(sales);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sales = await Sales.getById(id);

  if (sales.message) return next(sales);

  res.status(200).json(sales);
});

module.exports = {
  create,
  getAll,
  getById,
};
