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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const proxy = httpProxy.createProxyServer();

app.get('/api/productdata/q/:productId', (req, res) =>
  proxy.web(req, res, {
    target: 'http://pattribs-env.e2qskcpuit.us-east-2.elasticbeanstalk.com'
  })
);

app.get('/products', (req, res) =>
  proxy.web(req, res, {
    target: 'http://product-carousel.v7gashbsdz.us-west-2.elasticbeanstalk.com'
  })
);

app.get('/productsdisplay', (req, res) =>
  proxy.web(req, res, {
    target: 'http://rainforest-customer-reviews.us-west-1.elasticbeanstalk.com/'
  })
);

app.get('/cr/reviews/:productId', (req, res) =>
  proxy.web(req, res, {
    target: 'http://rainforest-customer-reviews.us-west-1.elasticbeanstalk.com'
  })
);

app.get('/cr/images/:reviewId', (req, res) =>
  proxy.web(req, res, {
    target: 'http://rainforest-customer-reviews.us-west-1.elasticbeanstalk.com'
  })
);

app.patch('/cr/reviews/:reviewId', (req, res) =>
  proxy.web(req, res, {
    target: 'http://rainforest-customer-reviews.us-west-1.elasticbeanstalk.com'
  })
);


module.exports = app;