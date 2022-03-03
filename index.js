const express = require('express');
const bodyParser = require('body-parser');
const ProductsRouter = require('./router/productsRouter');
const SalesRouter = require('./router/salesRouter');
const errMiddleware = require('./middlewares/errMIddleware');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);

app.use(errMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
