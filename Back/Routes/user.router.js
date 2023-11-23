const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController.js")

router.get("/getUsers", userController.getAll)
router.get("/:id", userController.getUserById)
router.post("/create", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)
router.post('/login', userController.login);


module.exports = router