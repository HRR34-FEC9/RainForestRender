const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const httpProxy = require('http-proxy');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, './public')));

const proxy = httpProxy.createProxyServer();

app.get('/api/productdata/product', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:3004'
  })
);

app.get('/products', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:3001'
  })
);

app.get('/productsdisplay', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:710'
  })
);

app.get('/cr/reviews/:productId', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:2000'
  })
);

app.get('/cr/images/:reviewId ', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:2000'
  })
);

app.patch('/cr/reviews/:reviewId ', (req, res) =>
  proxy.web(req, res, {
    target: 'http://localhost:2000'
  })
);


module.exports = app;