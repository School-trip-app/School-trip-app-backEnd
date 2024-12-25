'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const { commentModel, memoriesModel, UserModel, Reaction } = require('../models');
let sequelize = new Sequelize('postgresql://school44_user:aeFs4wMLPcNeq8fKvhRKOufn1LiQXC5h@dpg-cs90ajrqf0us738gvghg-a.oregon-postgres.render.com/school44', {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: true,
		native: true
	}
});

/* istanbul ignore next */
const multer = require('multer');
const upload = multer();

const addComment = async (req, res) => {
  try {
    // Use multer's middleware to parse form-data
    upload.none()(req, res, async (err) => {
      if (err) return res.status(400).json({ message: "Invalid form data" });

      const { userId, memoryId, content } = req.body;
      console.log("req.body:", req.body);

      if (!userId || !memoryId || !content) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newComment = await commentModel.create({
        userId,
        memoryId,
        content,
      });

      res.status(201).json(newComment);
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};


/* istanbul ignore next */

const getMemoriesWithComments = async (req, res) => {
  try {
    const memoriesWithComments = await memoriesModel.findAll({
   
      include: [
        {
          model: commentModel, include: [
            {
              model: UserModel, attributes: ['username'],  // Select fields you want from comments
            }
          ]
        },
   
        {
          model: UserModel, attributes: ['username'],  // Select fields you want from comments
        },
      ],
    });
    res.status(200).json(memoriesWithComments);
  } catch (error) {
    console.log("likesModel>>>>>>>>>>>>>>>",error)

    res.status(500).json({ message: "Error retrieving memories with comments", error });
  }
};

/* istanbul ignore next */

function updateComment(req, res, next) {
  try {
    commentModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateComment function : ${err}`);
  }
}
/* istanbul ignore next */

function deleteComment(req, res, next) {
  try {
    commentModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send('deleted') })
      .catch((reject) => { console.log(reject) });
  } catch (err) {
    next(`Error inside deleteComment function : ${err}`);
  }
}


module.exports = {
  addComment,
  getMemoriesWithComments,
  updateComment,
  deleteComment
}