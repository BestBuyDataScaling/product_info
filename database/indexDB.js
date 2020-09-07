const mongoose = require("mongoose");
const output = require("./output");
mongoose.connect("mongodb://localhost/sdc", { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema for database
let productSchema = mongoose.Schema({
  uniqueID: Number,
  name: String,
  description: String,
  brand: String,
  department: String,
  color: String,
  subDept: String,
  sku: Number,
  price: Number,
  avgRating: Number,
});

// Create a Product module
let Product = mongoose.model("Product", productSchema);

// let saveToDatabase = (model, callback) => {
//   Product.findOne({ uniqueID: model.uniqueID }, (err, data) => {
//     if (err) {
//       console.log("Error posting data-db", err);
//     } else {
// let new_product = new Product({
//   uniqueID: model.uniqueID,
//   name: model.name,
//   description: model.description,
//   brand: model.brand,
//   department: model.department,
//   color: model.color,
//   subDept: model.subDept,
//   sku: model.sku,
//   price: model.price,
//   avgRating: model.avgRating
//       });
//       new_product.save((err, data) => {
//         if (err) {
//           console.log('Error posting from db')
//           callback(err, null)
//         } else {
//           callback(null, data)
//         }
//       });
//     };
//     console.log(`Created ${model.uniqueID}`)
//   })
// }


const saveToDatabase = (post) => {
  let new_product = new Product({
    uniqueID: post.uniqueID,
    name: post.name,
    description: post.description,
    brand: post.brand,
    department: post.department,
    color: post.color,
    subDept: post.subDept,
    sku: post.sku,
    price: post.price,
    avgRating: post.avgRating
  });
  return new_product.save();
};

// returns product object that matches id variable
let grabOne = (id, callback) => {
  Product.findOne({ uniqueID: id }).exec(callback);
}

// * Seeds Database

// let promiseData = output.data.map(async (product) => {
//   return product;
// });
// Promise.all(promiseData).then((products) => {
//   products.map((product) => {
//     saveToDB(product);
//   });
// });


module.exports = {
  Product, grabOne, saveToDatabase
}