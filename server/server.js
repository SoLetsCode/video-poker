const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//middleware - this gets run on each call
app.use(express.json()); // this is so we can access req.body
app.use(express.urlencoded({ extended: false }));

//routes
const sample = require("./routes/api/sample.js");
const logRoute = require("./routes/api/logRoute.js");

//URLs to access each API
app.use("/api/sample", sample);
app.use("/api/log", logRoute);

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
