const express = require("express");
const router = express.Router();

// in case we need a reference for how to write to a .json file
// const productListFile = __dirname + "/../../models/inventory.json";
// const productList = require(productListFile);

router.get("/", (req, res) => {
  res.send("I'm alive!");
});

module.exports = router;
