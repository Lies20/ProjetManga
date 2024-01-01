const express = require("express")
const router = express.Router()

const adminController = require("../controllers/adminController.js")

router.delete("/:id", adminController.delete)

module.exports = router