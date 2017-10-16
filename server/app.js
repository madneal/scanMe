const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressVue = require('express-vue');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');
const config = require('./config/config');
const schedule = require('./schedule/schedule');
const modelLoader = require('./model/model_loder');

const app = express();
const router = express.Router();

modelLoader.initMongooseAndLoadModel(app, config.mongodb);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

const vueOptions = {
  rootPath: path.join(__dirname, '/views'),
  layout: {
      start: '<body><div id="app">',
      end: '</div></body>'
  }
};
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

const pageTitle = '链家二手房信息爬取';
const model = mongoose.model('realestate');
let queryCretia = {};
const queryResult = (queryCretia, data) => {
    console.log('enter queryResult');
    model.find(queryCretia, (err, docs) => {
        docs = docs.map(doc => {
            return doc.toObject();
        })
        data.real_estate_info = docs;
    });
    return data;
};

app.get('/', async (req, res) => {
  let data = {
      title: pageTitle,
    };
  const queryCriteria = {};

  data = await queryResult(queryCriteria, data);

  const vue = {
      head: {
          title: pageTitle
      }
  };
  res.renderVue('index', data, vue);
});

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

// schedule.playJob();

module.exports = app;
