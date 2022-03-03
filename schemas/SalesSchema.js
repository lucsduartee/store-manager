const errorsInId = {
  isUndefined: '"product_id" is required',
};

const errorsInQuantity = {
  isUndefined: '"quantity" is required',
  isInvalid: '"quantity" must be a number larger than or equal to 1',
};

const isUndefinedId = (arr) => arr.some((item) => !item.productId);
const isUndefinedQuantity = (arr) => arr.some((item) => !item.quantity);
const isInvalidQuantity = (quantity) => typeof quantity === 'string' || quantity <= 0;
const validateQuantity = (arr) => arr.some((item) => isInvalidQuantity(item.quantity));

const validateSales = (sales) => {
  switch (true) {
    case isUndefinedId(sales): return { code: 400, message: errorsInId.isUndefined };

    case validateQuantity(sales):
      return { code: 422, message: errorsInQuantity.isInvalid };

    case isUndefinedQuantity(sales):
      return { code: 400, message: errorsInQuantity.isUndefined };

    default:
      return {};
  }
};

module.exports = {
  validateSales,
};
