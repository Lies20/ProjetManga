const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController.js");

router.post("/:postId/toggle", likesController.toggle);

router.get("/:postId/stats", likesController.getStats);

router.post("/stats/multiple", likesController.getMultipleStats);

router.get("/:postId/list", likesController.getPostLikes);

router.get("/user/:userId", likesController.getUserLikedPosts);

router.get("/top/most-liked", likesController.getMostLiked);

module.exports = router;