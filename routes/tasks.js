const express = require("express");
const tasksController = require("../controller/task.js");
const router = express.Router();

router.get("/", tasksController.viewAll);
router.get("/:id", tasksController.viewById);

router.post("/", tasksController.addNewData);

router.delete("/:id", tasksController.deleteById);

router.put("/:id", tasksController.upgrade);

module.exports = router;
