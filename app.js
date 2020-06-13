var express = require('express');
require('dotenv').config()
require('./database/client')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const pokeRouter = require('./routes/pokemon');
const boardRouter = require('./routes/board');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(cors({
    exposedHeaders: 'x-auth-token',
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/pokemon', pokeRouter);
app.use('/board', boardRouter);
app.use('/auth', authRouter);

module.exports = app;
