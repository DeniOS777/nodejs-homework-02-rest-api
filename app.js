const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts or /api/users',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({
    status: 'fail',
    code: status,
    message: message,
  });
});

module.exports = app;
