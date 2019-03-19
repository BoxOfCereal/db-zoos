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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(zoo => res.status(200).json(zoo))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The zoo information could not be retrieved." })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  db.update(id, zoo)
    .then(count => {
      count ? db.findById(id).then(zoo => res.status(200).json(zoo)) : null;
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The zoo information could not be updated." })
    );
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count =>
      count
        ? res.status(200).json({ message: "Deleted Successfully." })
        : res.status(404).json({ error: "Cannot Delete Nonexistent Zoo" })
    )
    .catch(error =>
      res
        .status(500)
        .json({ error: "The zoo information could not be deleted." })
    );
});

module.exports = router;
