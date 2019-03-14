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
        .json({ error: "The posts information could not be retrieved." })
    );
});

module.exports = router;
