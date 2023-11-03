const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController.js")

router.get("/", userController.getAll)
router.get("/:id", userController.getById)
router.post("/", userController.create)
router.put("/:id", userController.uptade)
router.delete("/:id", userController.delete)


module.exports = router