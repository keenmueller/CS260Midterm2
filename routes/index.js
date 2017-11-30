var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/ordering', function(req, res, next) {
  Product.find(function(err, products){
    if(err){ return next(err); }
    res.json(products);
  });
});

router.post('/ordering', function(req, res, next) {
  var product = new Product(req.body);
  product.save(function(err, product){
    if(err){ return next(err); }
    res.json(product);
  });
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) {
      return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.get('/ordering/:product', function(req, res) {
  res.json(req.product);
});

router.put('/ordering/:product/order', function(req, res, next) {
  req.product.order(function(err, product){
    if (err) { return next(err); }
    res.json(product);
  });
});

router.delete('/ordering/:product', function(req, res) {
  console.log("in Delete");
  req.product.remove();
  res.sendStatus(200);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
