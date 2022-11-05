const express = require('express');
const path = require('path');
const cors = require('cors');
const globalErrorHandler = require('./controllers/error');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'https://jovi-notes-app.herokuapp.com/api/v1/notes',
      },
      {
        url: 'https://jovi-notes-app.herokuapp.com/api/v1/users',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(globalErrorHandler);

module.exports = app;
