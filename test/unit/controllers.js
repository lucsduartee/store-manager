const sinon = require('sinon');
const { expect } = require('chai');
const ProductsController = require('../../controllers/Products');
const ProductsService = require('../../services/Products');
const productsMock = require('./mock/products');

describe('Testa da camada Controllers', () => {
  describe('Products', () => {
    describe('Requisição para todos o produtos', () => {
      const req = {};
      const res = {};

      before(() => {
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub();

        sinon.stub(ProductsService, 'getAll').resolves(productsMock.allProducts);
      });

      after(() => {
        ProductsService.getAll.restore();
      });

      it('Deveria retornar um status 200', async () => {
        await ProductsController.getAllProducts(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        sinon.assert.notCalled(next);
      });
    });
  });
});
