const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//development
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const knex = require("./knexfile");

//middleware - this gets run on each call
app.use(cors());
app.use(express.json()); // this is so we can access req.body
app.use(express.urlencoded({ extended: false }));

//routes
const sample = require("./routes/api/sample.js");
const logRoute = require("./routes/api/logRoute.js");
const userRoute = require("./routes/api/userRoute.js");

//URLs to access each API
app.use("/api/log", logRoute);
app.use("/api/user", userRoute);

let connection;
//make connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(knex.development);
}

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

connection.connect(err => {
  console.log("connected as id " + connection.threadId);
});

//Export connection for our ORM to use
module.exports = connection;
