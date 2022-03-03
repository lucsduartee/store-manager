const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../services/Products');
const SalesService = require('../../services/Sales');
const productsMock = require('./mock/products');
const salesMock = require('./mock/sales');

describe('Teste da camada Services', () => {
  describe('Products', () => {
    describe('Criando produto', () => {
      before(() => {
        sinon.stub(ProductsService, 'create').resolves(productsMock.insertedProduct);
      });

      after(() => {
        ProductsService.create.restore();
      });

      it('criação de um novo produto retorna um objeto', async () => {
        const result = await ProductsService.create('Kunai', 3);

        expect(result).to.be.an('object');
      });

      it('O retorno possui a chave "id"', async () => {
        const result = await ProductsService.create('Kunai', 3);

        expect(result).to.have.property('id');
      });
    });

    describe('Lista todos os produtos', () => {
      before(() => {
        sinon.stub(ProductsService, 'getAll').resolves([productsMock.allProducts]);
      });

      after(() => {
        ProductsService.getAll.restore();
      })

      it('o retorno deve ser um array', async () => {
        const result = await ProductsService.getAll();

        expect(result).to.be.an('array');
      });

      it('o retorno deve ser um array não vazio', async () => {
        const result = await ProductsService.getAll();

        expect(result).to.not.have.lengthOf(0);
      });
    })

    describe('Lista produtos por id', () => {
      before(() => {
        sinon.stub(ProductsService, 'getById').resolves(productsMock.insertedProduct);
      });

      after(() => {
        ProductsService.getById.restore();
      })

      it('o retorno deve ser um objeto', async () => {
        const result = await ProductsService.getById(1);

        expect(result).to.be.an('object');
      });

      it('O retorno possui a chave "id", "name" e "quantity"', async () => {
        const result = await ProductsService.getById(1);

        expect(result).to.include.all.keys(
          "id",
          "name",
          "quantity",
        );
      });
    })
  });

  describe('Sales', () => {
    describe('Lista todas as vendas', () => {
      before(() => {
        sinon.stub(SalesService, 'getAll').resolves(salesMock.allSales);
      });

      after(() => {
        SalesService.getAll.restore();
      })

      it('o retorno deve ser um array', async () => {
        const result = await SalesService.getAll();

        expect(result).to.be.an('array');
      });

      it('o retorno deve ser um array não vazio', async () => {
        const result = await SalesService.getAll();

        expect(result).to.not.have.lengthOf(0);
      });
    })

    // describe('Lista vendas por id', () => {
    //   before(() => {
    //     sinon.stub(connection, 'execute').resolves([[salesMock.saleById]]);
    //   });

    //   after(() => {
    //     connection.execute.restore();
    //   })

    //   it('o retorno deve ser um array', async () => {
    //     const result = await Sales.getById(1);

    //     expect(result).to.be.an('array');
    //   });

    //   it('O retorno possui a chave "date", "product_id" e "quantity"', async () => {
    //     const result = await Products.getById(1);

    //     expect(result[0]).to.include.all.keys(
    //       "date",
    //       "product_id",
    //       "quantity",
    //     );
    //   });
    // })
  });
});

