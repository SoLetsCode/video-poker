const express = require("express");
const router = express.Router();

//models
const Logs = require("../../models/logs");
const Users = require("../../models/users");

router.get("/all", (req, res) => {
  console.log("running");
  Users.where(req.body)
    .fetchAll()
    .then(users => {
      res.status(200).json({ users });
    });
});

router.get("/id", (req, res) => {
  Users.where("id", req.body.id)
    .fetch()
    .then(user => res.status(200).json({ user }))
    .catch(user => {
      res.status(404).json({ error: `could not find user ${user}` });
    });
});

module.exports = router;
