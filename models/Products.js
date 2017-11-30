var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  Name: String,
  price: Number,
  orders: {type: Number, default: 0},
  picture: String,
});

ProductSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};

mongoose.model('Product', ProductSchema);
