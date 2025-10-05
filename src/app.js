  require('dotenv').config();

  const express = require('express');
  const app = express();
  const errorHandler = require('./middlewares/errorHandler');
  const gamesRouter = require('./routes/games.router');
  const customersRouter = require('./routes/customers.router');
  const rentalsRouter = require('./routes/rentals.router');

  app.use(express.json());
  app.use('/games', gamesRouter);
  app.use('/customers', customersRouter);
  app.use('/rentals', rentalsRouter);


  app.use((req, res, next) => {
    const notFound = new Error('A rota solicitada não existe.');
    notFound.status = 404;
    next(notFound);
  });

  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
  });