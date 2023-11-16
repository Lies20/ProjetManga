const express = require("express")
const router = express.Router()

const postController = require("../controllers/postController.js")

router.get("/", postController.getAll)
router.get("/:id", postController.getById)
router.post("/createPost", postController.create)
router.put("/:id", postController.update)
router.delete("/:id", postController.delete)

module.exports = router