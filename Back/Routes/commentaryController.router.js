const express = require("express")
const router = express.Router()

const commentaryController = require("../controllers/commentaryController.js")

router.get("/", commentaryController.getAll)
router.get("/:id", commentaryController.getById)
router.post("/", commentaryController.create)
router.put("/:id", commentaryController.uptade)
router.delete("/:id", commentaryController.delete)


module.exports = router