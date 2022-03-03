const Products = require('../models/Products');
const validations = require('../schemas/ProductsSchema');

const create = async (product) => {
  const { name, quantity } = product;
  const allProducts = await Products.getAllProducts();
  const validateName = validations.validateName(allProducts, product);
  if (validateName.message) return validateName;
  const validateQuantity = validations.validateQuantity(product);
  if (validateQuantity.message) return validateQuantity;

  const result = await Products.createProduct(name, quantity);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const allProducts = await Products.getAllProducts();

  return allProducts;
};

const getById = async (id) => {
  const product = await Products.getById(id);
  const allProducts = await Products.getAllProducts();

  const validateId = validations.validateId(id, allProducts);
  if (validateId.message) return validateId;

  return product;
};

const updateProduct = async (id, product) => {
  const { name, quantity } = product;
  const allProducts = await Products.getAllProducts();
  const validateQuantity = validations.validateQuantity(product);
  if (validateQuantity.message) return validateQuantity;
  const validateName = validations.validateName(allProducts, product);
  if (validateName.message) return validateName;
  const validateId = validations.validateId(id, allProducts);
  if (validateId.message) return validateId;

  await Products.updateProduct(id, name, quantity);

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const allProducts = await Products.getAllProducts();
  const validateId = validations.validateId(id, allProducts);
  if (validateId.message) return validateId;

  const product = await Products.getById(id);
  await Products.deleteProduct(id);

  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
