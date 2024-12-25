const { Reaction, memoriesModel, UserModel } = require("../models");

const addOrUpdateReaction = async (req, res) => {
  const { memoryId } = req.params;
  const { userId, reactionType } = req.body;

  console.log("memoryId>>>",memoryId)
  console.log("req.body<>>>","userID>>",userId,">>", req.body.userId, "react>>", reactionType, "me>>>", memoryId)
  try {
    let reaction = await Reaction.findOne({
      where: { memoryId, userId },
    });
console.log("reaction>>>",reaction)
    if (reaction) {
      reaction.reactionType = reactionType;
      await reaction.save();
    } else {
      reaction = await Reaction.create({ userId, memoryId, reactionType });
    }

    const likesCount = await Reaction.count({ where: { memoryId, reactionType: "like" } });
    const dislikesCount = await Reaction.count({ where: { memoryId, reactionType: "dislike" } });

    return res.json({ likes: likesCount, dislikes: dislikesCount });
  } catch (error) {
    res.status(500).json({ error: "Error updating reaction" });
  }
};

const getReactionsSummary = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const likesCount = await Reaction.count({ where: { memoryId, reactionType: "like" } });
    const dislikesCount = await Reaction.count({ where: { memoryId, reactionType: "dislike" } });

    res.json({ likes: likesCount, dislikes: dislikesCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching reactions" });
  }
};

module.exports = {
  addOrUpdateReaction,
  getReactionsSummary,
};
