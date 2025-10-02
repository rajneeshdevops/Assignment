const express = require("express");
const { addComment, getComments } = require("../controller/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:solutionId", getComments);

module.exports = router;
