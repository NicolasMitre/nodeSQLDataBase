const express = require("express");
const tasksController = require("../controller/task.js");
const router = express.Router();

/* getters */
router.get("/", tasksController.viewAll);
router.get("/:id([0-9]*)", tasksController.viewById); // get by id
router.get("/filter/", tasksController.viewByFilter); // get by filter thx to Damian

/* postters */
router.post("/", tasksController.addNewData); // by body - parser

/* deletters */
router.delete("/:id", tasksController.deleteById);

/* updatters */
router.put("/", tasksController.upgrade); // by body - parser

module.exports = router;
