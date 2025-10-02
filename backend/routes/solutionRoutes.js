const express = require("express");
const { addSolution, getSolutions, upvoteSolution } = require("../controller/solutionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addSolution);
router.get("/:problemId", getSolutions);
router.post("/upvote/:solutionId", authMiddleware, upvoteSolution);

module.exports = router;
