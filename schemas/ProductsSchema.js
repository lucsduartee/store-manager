const errorsInName = {
  undefinedName: '"name" is required',
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists',
};

const errorsInQuantity = {
  undefinedQuantity: '"quantity" is required',
  isNegative: '"quantity" must be a number larger than or equal to 1',
};

const errorInId = {
  invalidId: 'Product not found',
};

const isUndefined = (value) => !value;

const isShort = (value) => value.length < 5;

const alreadyExists = (products, name) => {
  const found = products.filter((product) => product.name === name);
  return found.length !== 0;
};

const isInvalidQuantity = (quantity) => typeof quantity === 'string' || quantity <= 0;

const validateName = (productsList, product) => {
  switch (true) {
    case isUndefined(product.name): return { code: 400, message: errorsInName.undefinedName };
    case isShort(product.name): return { code: 422, message: errorsInName.shortName };
    case alreadyExists(productsList, product.name):
        return { code: 409, message: errorsInName.alreadyExists };
    default:
      return {};
  }
};

const validateQuantity = (product) => {
  switch (true) {
    case isInvalidQuantity(product.quantity):
        return { code: 422, message: errorsInQuantity.isNegative };
    case isUndefined(product.quantity):
      return { code: 400, message: errorsInQuantity.undefinedQuantity };
    default:
      return {};
  }
};

const validateId = (id, products) => {
  const found = products.filter((product) => product.id === +id);
  return found.length === 0 ? { code: 404, message: errorInId.invalidId } : {};
};

module.exports = {
  validateName,
  validateQuantity,
  validateId,
};
