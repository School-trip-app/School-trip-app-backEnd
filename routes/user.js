const router = require('express').Router();

const multer = require('multer');
const path = require('path');

const { checkUser } = require('../middlewares/userCheck');
const bearerAuth = require('../middlewares/bearerAuth');
const { deleteUser,
    updateCaplities,
    getAllUsers,
    signIN,
    createnewUser, } = require('../controllers/user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

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
}).single('image')


router.post('/user', upload, checkUser, createnewUser);


router.post('/signin', signIN);



router.get('/users', getAllUsers);


router.put('/user/:id', updateCaplities)


router.delete('/user/:id', deleteUser)




module.exports = router;