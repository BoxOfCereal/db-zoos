const express = require("express");
const router = express.Router();

const db = require("../data/bearsDb");

router.get("/", (req, res) => {
  db.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The bears information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const bear = req.body;
  db.insert(bear)
    .then(id => res.status(201).json(id))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The bear information could not be entered." })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(bear => res.status(200).json(bear))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The bear information could not be retrieved." })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const bear = req.body;
  db.update(id, bear)
    .then(count => {
      count ? db.findById(id).then(bear => res.status(200).json(bear)) : null;
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The bear information could not be updated." })
    );
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count =>
      count
        ? res.status(200).json({ message: "Deleted Successfully." })
        : res.status(404).json({ error: "Cannot Delete Nonexistent bear" })
    )
    .catch(error =>
      res
        .status(500)
        .json({ error: "The bear information could not be deleted." })
    );
});

module.exports = router;
