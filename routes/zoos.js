const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", (req, res) => {
  db.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .then(id => res.status(201).json(id))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The zoo information could not be entered." })
    );
});

module.exports = router;
