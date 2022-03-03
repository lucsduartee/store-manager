const Sales = require('../models/Sales');
const validations = require('../schemas/SalesSchema');

const serialize = (sales) => sales.map((sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
}));

const create = async (sales) => {
  const serialized = serialize(sales);
  const validateSale = validations.validateSales(serialized);
  if (validateSale.message) return validateSale;
  const result = await Sales.create(serialized);

  return {
    id: result,
    itemsSold: sales,
  };
};

const getAll = async () => {
  const sales = await Sales.getAllSales();

  return sales;
};

const getById = async (id) => {
  const sales = await Sales.getById(id);
  if (!sales || sales.length === 0) return { code: 404, message: 'Sale not found' };

  return sales;
};

module.exports = {
  create,
  getAll,
  getById,
};
