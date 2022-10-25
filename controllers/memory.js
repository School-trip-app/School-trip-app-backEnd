'use strict';

const { memoriesModel, commentModel, UserModel } = require('../models');
const multer = require('multer');
const path = require('path');
/* istanbul ignore next */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ImageMemor')
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
        userId:req.body.userId,
        image:req.file.path,
        discription:req.body.discription
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
    const allMemory= await memoriesModel.findAll({ include: [commentModel, UserModel] })
     res.status(200).send(allMemory);
    } catch (err) {
        next(`Error inside getMemorys function : ${err}`);
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
        const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
        const likes = memory.likes + 1;
        await memoriesModel.update({ likes: likes }, { where: { id: req.params.id } })
            .then(resolve => { res.status(200).send('updated') })
            .catch(reject => { console.log(`cannot update`) });
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