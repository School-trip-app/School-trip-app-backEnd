const router = require('express').Router();


<<<<<<< HEAD
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UserModel } = require('../modules/index');
const { checkUser } = require('../middlewares/userCheck');


const createnewUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const newUser = {
            username: userInfo.username,
            email: userInfo.email,
            password: await bcrypt.hash(userInfo.password, 12),
            userRole: userInfo.userRole
        };
        const user = await UserModel.create(newUser);
        if (user) res.status(201).json(user);
    }
    catch (error) {
=======

const { checkUser } = require('../middlewares/userCheck');
const bearerAuth = require('../middlewares/bearerAuth');
const { deleteUser,
    updateCaplities,
    getAllUsers,
    signIN,
    createnewUser,
    upload, updateImageProfile, upload2} = require('../controllers/user');


>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c


<<<<<<< HEAD
    }
}
router.post('/user', checkUser, createnewUser);
=======
router.post('/user', upload, checkUser, createnewUser);
>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c


router.post('/signin', signIN);

<<<<<<< HEAD
=======


router.get('/user', getAllUsers);


router.put('/user/:id', updateCaplities)


router.delete('/user/:id', deleteUser)

router.put('/users/:id', bearerAuth,upload2, updateImageProfile);



>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c
module.exports = router;