const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_inventory_db');

const Product = conn.define('product', {
  name: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM('INSTOCK', 'BACKORDERED', 'DISCONTINUED')
    }
})

const syncAndSeed = async () => {
  await conn.sync({force: true});
  const productNames = ['Foo', 'Bar', 'Bazz', 'Qug'];
  await Promise.all(productNames.map(name => Product.create({name})));
};
module.exports = {
  models: {
    Product
  },
syncAndSeed
};
