const express = require('express');
const path = require('path');
const globalErrorHandler = require('./controllers/error');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/notes/', noteRouter);

app.use(globalErrorHandler);

module.exports = app;
