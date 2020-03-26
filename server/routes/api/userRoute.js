const express = require("express");
const router = express.Router();

//models
const Users = require("../../models/users");

// router.get("/all", (req, res) => {
//   Users.where(req.body)
//     .fetchAll()
//     .then(users => {
//       res.status(200).json({ users });
//     });
// });

router.get("/:hash", (req, res) => {
  Users.where("hash", req.params.hash)
    .fetch()
    .then(user => res.status(200).json({ user }))
    .catch(user => {
      res
        .status(404)
        .json({ error: `email and password do not match a listed user` });
    });
});

router.post("/", (req, res) => {
  Users.where("hash", req.body.hash)
    .fetch()
    .then(user => res.status(200).json({ user }))
    .catch(() => {
      //only add if the user doesn't exist, otherwise just return the found user
      new Users({
        name: req.body.name,
        hash: req.body.hash
      })
        .save()
        .then(user => {
          res.status(201).json({ user });
        })
        .catch(error => res.status(404).json({ error }));
    });
});

module.exports = router;
