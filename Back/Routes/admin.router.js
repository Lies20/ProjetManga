const express = require("express")
const router = express.Router()

const adminController = require("../controllers/adminController.js")

router.delete("/:id", adminController.delete)
router.delete("/comment/:id", adminController.deleteComment)
router.get('/infos', adminController.infos)

module.exports = router