const router = require('express').Router();
const { checkUser } = require('../middlewares/userCheck');
const bearerAuth = require('../middlewares/bearerAuth');
const { deleteUser, getAllUsers, signIN, createnewUser, upload, updateImageProfile, getUserById } = require('../controllers/user');
const { UserModel } = require('../models');
const { broadcastEvent } = require('../websocket');  // Import broadcastEvent from websocket.js

// Controller function to update capabilities
const updateCaplities = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findOne({ where: { id } });
        await user.update({ userRole: 'enabledSchool' });

        // Broadcast the update to WebSocket clients
        broadcastEvent({
            type: 'ACCOUNT_STATUS_UPDATE',
            payload: { userId: id, newStatus: 'enabledSchool' }
        });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to update account' });
    }
};

// Define routes
router.post('/user', upload, checkUser, createnewUser);
router.get('/user/:id', getUserById);
router.post('/signin', signIN);
router.get('/user', getAllUsers);
router.put('/user/:id', updateCaplities);  // Update capabilities route
router.delete('/user/:id', deleteUser);
router.put('/users/:id', upload, updateImageProfile);

module.exports = router;
