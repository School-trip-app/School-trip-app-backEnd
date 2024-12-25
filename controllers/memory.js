'use strict';

const { memoriesModel, UserModel, Reaction, commentModel } = require('../models');
const multer = require('multer');
const path = require('path');
/* istanbul ignore next */
const { Sequelize } = require('sequelize');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
/* istanbul ignore next */

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image');

/* istanbul ignore next */
async function addMemory(req, res) {
    //body:{"userId":"integer","imageUrl":"string","discription":"string","likes":"integer","dislikes":"integer"}
    try {
        const memory = {
            userId: req.body.userId,
            image: req.file.path,
            title: req.body.title,
            discription: req.body.discription
        }
        const createMemory = await memoriesModel.create(memory);
        res.status(200).json(createMemory);
    } catch (error) {
        console.log(error);
    }
}
/* istanbul ignore next */

async function getMemorys(req, res, next) {
    try {
        // const userId = req.body.userId;
        const userId = parseInt(req.params.userId)
        // Ensure the user's ID is available in the request
        // Fetch memories and include aggregated reaction data and user-specific dislike status
        const allMemory = await memoriesModel.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn(
                            'SUM',
                            Sequelize.literal(`CASE WHEN reactions."reactionType" = 'like' THEN 1 ELSE 0 END`)
                        ),
                        'likes'
                    ],
                    [
                        Sequelize.fn(
                            'SUM',
                            Sequelize.literal(`CASE WHEN reactions."reactionType" = 'dislike' THEN 1 ELSE 0 END`)
                        ),
                        'dislikes'
                    ],
                    [
                        Sequelize.literal(`EXISTS (
                            SELECT 1
                            FROM reactions
                            WHERE reactions."memoryId" = memories.id
                            AND reactions."userId" = :userId
                            AND reactions."reactionType" = 'dislike'
                        )`),
                        'dislikedByUser'
                    ]
                ]
            },
            include: [
                {
                    model: commentModel,
                    attributes: ['id', 'content', 'userId'], // Include required fields only
                    include: [
                        {
                            model: UserModel,
                            attributes: ['id', 'username'], // Select fields you want from comments' user
                        }
                    ]
                },
                {
                    model: UserModel, // Include user data
                },
                {
                    model: Reaction,
                    attributes: [] // Exclude raw reaction data to avoid ambiguity
                }
            ],
            group: [
                'memories.id',
                'user.id',
                'comments.id',
                'comments->user.id', // Add comments->user.id to GROUP BY
            ], // Group by memory, user, and related comment fields
            replacements: { userId }, // Pass the userId as a replacement parameter
        });

        res.status(200).send(allMemory);
    } catch (err) {
        next(`Error inside getMemorys function: ${err}`);
    }
}






/* istanbul ignore next */

async function updateMemory(req, res, next) {
    try {
        await memoriesModel.update(req.body, { where: { id: req.params.id } })
            .then(resolve => { res.status(200).send('updated') })
            .catch(reject => { console.log(`cannot update`) });
    } catch (err) {
        next(`Error inside updateMemory function : ${err}`);
    }
}

const updateComments = async (req, res) => {
    const id = req.params.id;
    const memeoryId = req.params.id;

    const memeory = await memoriesModel.findOne({ where: { id: memeoryId } })


}
/* istanbul ignore next */

async function deleteMemory(req, res, next) {
    try {
        await memoriesModel.destroy({ where: { id: req.params.id } })
            .then((resolve) => { res.status(202).send(`deleted`) })
            .catch((reject) => { console.log('Cant Delete') });
    } catch (err) {
        next(`Error inside deleteMemory function : ${err}`);
    }
}
/* istanbul ignore next */

async function updateLike(req, res, next) {
    try {
        const memory = await memoriesModel.findOne({ where: { id: req.params.id } });
        const likeStatus = await likesModel.findOne({
            where: {
                userId: req.body.userId,
                memoryId: req.body.memoryId
            }
        });
        if (likeStatus.likeStatus) {
            const likes = memory.likes - 1;
            await memoriesModel.update({ likes: likes }, { where: { id: req.params.id } })
                .then(resolve => { res.status(200).send('updated') })
                .catch(reject => { console.log(`cannot update`) });
        }
        else {
            const likes = memory.likes + 1;
            await memoriesModel.update({ likes: likes }, { where: { id: req.params.id } })
                .then(resolve => { res.status(200).send('updated') })
                .catch(reject => { console.log(`cannot update`) });
        }

    } catch (err) {
        next(`Error inside updateLike function : ${err}`);
    }
}
/* istanbul ignore next */

async function updateDislike(req, res, next) {
    try {
        const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
        const dislikes = memory.dislikes + 1;
        await memoriesModel.update({ dislikes: dislikes }, { where: { id: req.params.id } })
            .then(resolve => { res.status(200).send('updated') })
            .catch(reject => { console.log(`cannot update`) });
    } catch (err) {
        next(`Error inside updateDislike function : ${err}`);
    }
}

module.exports = {
    addMemory,
    getMemorys,
    deleteMemory,
    updateLike,
    updateDislike,
    updateMemory,
    upload
} 