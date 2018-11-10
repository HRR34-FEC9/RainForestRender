require('dotenv').config();
const Sequelize = require('sequelize');
const loremIpsum = require('./MOCK_DATA.json');
const { urls } = require('./IMAGE_URLS.json');

const rpUrl = process.env.RECOMMENDED_PRODUCTS_URL;

const sequelize = new Sequelize(rpUrl, {
  dialect: 'postgres'
});

let products = sequelize.define('product', {
  short_desc: Sequelize.TEXT,
  image_url: Sequelize.TEXT,
  rating: Sequelize.DECIMAL,
  reviews: Sequelize.INTEGER,
  price: Sequelize.TEXT,
  category: Sequelize.TEXT,
  purchase_url: Sequelize.TEXT
}, {
  underscored: true
});

sequelize.sync().then(() => {
  for (let i = 0; i < urls.length; i++) {
    let {short_desc, rating, reviews, price} = loremIpsum[i];
    products.create(
      {
        short_desc,
        image_url: urls[i],
        rating,
        reviews,
        price,
        category: 'Electronics',
        purchase_url: urls[i]
      }
    );
  }
}).catch((err) => {
  console.log(err);
});

