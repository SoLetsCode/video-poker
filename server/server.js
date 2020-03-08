const express = require("express");
const app = express();

//middleware - this gets run on each call
app.use(express.json()); // this is so we can access req.body

//routes
const sample = require("./routes/api/sample.js");

//URLs to access each API
app.use("/api/sample", sample);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
