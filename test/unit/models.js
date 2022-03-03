const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const Products = require('../../models/Products');
const Sales = require('../../models/Sales');
const productsMock = require('./mock/products');
const salesMock = require('./mock/sales');

describe('Teste da camada Model', () => {
  describe('Products', () => {
    describe('Criando produto', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock.insertedProduct]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('criação de um novo produto retorna um objeto', async () => {
        const result = await Products.createProduct('Kunai', 3);

        expect(result).to.be.an('object');
      });

      it('O retorno possui a chave "id"', async () => {
        const result = await Products.createProduct('Kunai', 3);

        expect(result).to.have.property('id');
      });
    });

    describe('Lista todos os produtos', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock.allProducts]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('o retorno deve ser um array', async () => {
        const result = await Products.getAllProducts();

        expect(result).to.be.an('array');
      });

      it('o retorno deve ser um array não vazio', async () => {
        const result = await Products.getAllProducts();

        expect(result).to.not.have.lengthOf(0);
      });
    })

    describe('Lista produtos por id', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[productsMock.insertedProduct]]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('o retorno deve ser um objeto', async () => {
        const result = await Products.getById(1);

        expect(result).to.be.an('object');
      });

      it('O retorno possui a chave "id", "name" e "quantity"', async () => {
        const result = await Products.getById(1);

        expect(result).to.include.all.keys(
          "id",
          "name",
          "quantity",
        );
      });
    })
  });

  describe('Sales', () => {
    describe('Criando uma venda', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([{insertId: 1}]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('criação de uma nova venda retorna um array', async () => {
        const result = await Sales.create(salesMock.sales);

        expect(result).to.equals(1);
      });
    });

    describe('Lista todas as vendas', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([salesMock.allSales]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('o retorno deve ser um array', async () => {
        const result = await Sales.getAllSales();

        expect(result).to.be.an('array');
      });

      it('o retorno deve ser um array não vazio', async () => {
        const result = await Sales.getAllSales();

        expect(result).to.not.have.lengthOf(0);
      });
    })

    describe('Lista vendas por id', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[salesMock.saleById]]);
      });

      after(() => {
        connection.execute.restore();
      })

      it('o retorno deve ser um array', async () => {
        const result = await Sales.getById(1);

        expect(result).to.be.an('array');
      });

      it('O retorno possui a chave "date", "product_id" e "quantity"', async () => {
        const result = await Products.getById(1);

        expect(result[0]).to.include.all.keys(
          "date",
          "product_id",
          "quantity",
        );
      });
    })
  });
});
