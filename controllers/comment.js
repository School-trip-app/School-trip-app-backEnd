'use strict';

const { commentModel, memoriesModel, UserModel } = require('../models');


async function addComment(req, res, next) {
    // body:{"userId":"integer","memoryId":"integer","comment":"string"}
    try {
        const commentData = {
            userId: req.params.userId,
            memoryId: req.params.memoryId,
            comment: req.body.comment
        }
        const comment = await commentModel.create(commentData)
        .then(resolve => { res.status(201).send(resolve) })
        .catch(reject => { res.status(306).send(reject) });
    } catch (err) {
        next(`Error inside addComment function : ${err}`);
    }
}

function getMemoryComments(req, res, next) {
    try {
        commentModel.findAll({ where: { memoryId: req.params.memoryId }, include: [memoriesModel, UserModel] })
            .then((resolve) => {
                res.status(200).send(resolve);
            })
            .catch((reject) => { console.log(reject) });
    } catch (err) {
        next(`Error inside getMemoryComments function : ${err}`);
    }
}

function updateComment(req, res, next) {
    try {
        commentModel.update(req.body, { where: { id: req.params.id } })
            .then(resolve => { res.status(200).send(resolve) })
            .catch(reject => { console.log(reject) });
    } catch (err) {
        next(`Error inside updateComment function : ${err}`);
    }
}

function deleteComment(req, res, next) {
    try {
        commentModel.destroy({ where: { id: req.params.id } })
            .then((resolve) => { res.status(202).end(); })
            .catch((reject) => { console.log(reject) });
    } catch (err) {
        next(`Error inside deleteComment function : ${err}`);
    }
}


module.exports = {
    addComment,
    getMemoryComments,
    updateComment,
    deleteComment
}