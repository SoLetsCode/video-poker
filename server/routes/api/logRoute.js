const express = require("express");
const router = express.Router();

//models
const Logs = require("../../models/logs");
const Users = require("../../models/users");

router.get("/:id", (req, res) => {
  Logs.where("user_id", req.params.id)
    .fetchAll()
    .then(logs => {
      res.status(200).json({ logs });
    });
});

router.post("/", (req, res) => {
  Users.where("id", req.body.user_id)
    .fetch()
    .then(user => console.log(`${user} found`))
    .catch(user => {
      res.status(404).json({ error: `could not find user ${user}` });
    });

  new Logs({
    hand: JSON.stringify(req.body.hand),
    playerhold: JSON.stringify(req.body.playerhold),
    trainerhold: JSON.stringify(req.body.trainerhold),
    user_id: req.body.user_id,
    outcome: req.body.outcome,
    finalhand: JSON.stringify(req.body.finalhand),
    result: req.body.result,
    credit: req.body.credit
  })
    .save()
    .then(newLog => {
      res.status(201).json({ newLog });
    });
});

module.exports = router;
