const express = require("express");

const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) =>
  fs.readFile("server/users.json", (err, data) => {
    res.json(JSON.parse(data));
  })
);

router.post("/", (req, res) => res.json({ message: "users post" }));
router.post("/:id", (req, res) => res.json({ message: "users id" }));

module.exports = router;
