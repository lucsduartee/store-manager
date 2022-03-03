const connection = require('./connection');

const create = async (sales) => {
  const qSales = 'INSERT INTO sales (date) VALUES (now())';
  const qSalesProd = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [result] = await connection.execute(qSales);
  const id = result.insertId;
  const promises = sales.map(async ({ productId, quantity }) =>
    connection.execute(qSalesProd, [id, productId, quantity]));

  await Promise.all(promises);
  return id;
};

const getAllSales = async () => {
  const query = 'SELECT sales_p.sale_id AS saleId, sales_p.quantity, sales_p.product_id, s.date'
    + ' FROM sales_products AS sales_p JOIN sales AS s ON sales_p.sale_id = s.id';

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT s.date, sales_p.product_id, sales_p.quantity'
    + ' FROM sales_products AS sales_p JOIN sales AS s ON sales_p.sale_id = s.id'
    + ' WHERE sales_p.sale_id = ?';

  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  create,
  getAllSales,
  getById,
};
