const express = require('express');
const app = express();
const router = express.Router();
const { syncAndSeed, models } = require('./db');
const { Product } = models

syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

router.get('/', async (req, res, next) => {
  try {
    res.send(await Product.findAll())
  }
  catch (ex){
    console.log(ex)
  }
})
router.get('/:instock',  async (req, res, next) => {
  try {
    res.send(await Product.findAll({
      where: {
        status: 'INSTOCK'
      }
    }))
  }
  catch (ex){
    next(ex);
  }
})
router.get('/backordered',  async (req, res, next) => {
  try {
    res.send(await Product.findAll({
      where: {
        status: 'BACKORDERED'
      }
    }))
  }
  catch (ex){
    console.log(ex);
  }
})
router.get('/discontinued',  async (req, res, next) => {
  try {
    res.send(await Product.findAll({
      where: {
        status: 'DISCONTINUED'
      }
    }))
  }
  catch (ex){
    console.log(ex);
  }
})
