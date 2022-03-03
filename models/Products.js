const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);

  return result;
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE products.id = ?';
  const [result] = await connection.execute(query, [id]);
  return { ...result[0] };
};

const updateProduct = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, quantity, id]);

  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getById,
  updateProduct,
  deleteProduct,
};
