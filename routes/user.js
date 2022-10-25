const router = require('express').Router();



const { checkUser } = require('../middlewares/userCheck');
const bearerAuth = require('../middlewares/bearerAuth');
const { deleteUser,
    updateCaplities,
    getAllUsers,
    signIN,
    createnewUser,
    upload, updateImageProfile, upload2} = require('../controllers/user');




router.post('/user', upload, checkUser, createnewUser);


router.post('/signin', signIN);



router.get('/user', getAllUsers);


router.put('/user/:id', updateCaplities)


router.delete('/user/:id', deleteUser)

router.put('/users/:id', bearerAuth,upload2, updateImageProfile);



module.exports = router;