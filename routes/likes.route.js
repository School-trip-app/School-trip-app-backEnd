const express = require("express");
const router = express.Router();
const { addOrUpdateReaction, getReactionsSummary } = require("../controllers/reactionController");

router.post("/memories/:memoryId/reaction", addOrUpdateReaction);
router.get("/memories/:memoryId/reactions", getReactionsSummary);

module.exports = router;
