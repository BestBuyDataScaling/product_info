const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const db = require("../database/indexDB")
const path = require('path');
require('newrelic');

// use
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public')))

// server routing

//get all product info
app.get('/api/products', (req, res) => {
  // No query passed in means "find everything"
  db.Product.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
})


app.get('/api/products/:id', (req, res) => {
  // No query passed in means "find everything"
  let id = Number(req.params.id);
  db.Product.findOne({ uniqueID: id }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
})

// post product_info
app.post(`/api/add-product/:id`, (req, res) => {
  let info = {
    uniqueID: req.params.id,
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    department: req.body.department,
    color: req.body.color,
    subDept: req.body.subDept,
    sku: req.body.sku,
    price: req.body.price,
    avgRating: req.body.avgRating
  }
  db.saveToDatabase(info,
    (err, results) => {
      if (err) {
        console.log("error saving to database");
        res.send(500);
      } else {
        res.send(results);
      }
    })
});

// Update product by id
app.put('/update-products/:id', (req, res) => {
  let id = req.params.id;
  let product = {
    uniqueID: id,
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    department: req.body.department,
    color: req.body.color,
    subDept: req.body.subDept,
    sku: req.body.sku,
    price: req.body.price,
    avgRating: req.body.avgRating
  }
  db.Product.updateOne({ uniqueID: id }, product, (err, results) => {
    if (err) {
      console.log("Error updating database")
    } else {
      res.send(results)
    }
  })
})

// deletes one product info
app.delete('/remove-product/:id', (req, res) => {
  let id = req.params.id;
  db.Product.deleteOne({ uniqueID: id }, (err, results) => {
    if (err) {
      console.log("error overwriting data")
    } else {
      res.send(results)
    }
  })
})


// listening
app.listen(port, () => {
  console.log(`productInfo listening at ${port}`);
});
