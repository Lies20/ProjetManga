const express = require("express")
const router = express.Router()

const commentaryController = require("../controllers/commentaryController.js")

router.get("/", commentaryController.getAll)
router.get("/:id", commentaryController.getById)
router.post("/create", commentaryController.create)
router.put("/:id", commentaryController.update)
router.delete("/:id", commentaryController.delete)
router.get("/comments/post/:id", commentaryController.getCommentsByPostId)


module.exports = router