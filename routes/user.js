const router = require('express').Router();


const bcrypt = require('bcrypt');
const base64 = require('base-64');
const multer = require('multer');
const path = require('path');

const { UserModel } = require('../models');
const { checkUser } = require('../middlewares/userCheck');
const bearerAuth=require('../middlewares/bearerAuth');

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

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


const createnewUser = async (req, res) => {
    try {
        const userInfo = req.body;
        let  newUser={}
        if(userInfo.userRole=='school'){
            newUser= {
                username: userInfo.username,
                email: userInfo.email,
                password: await bcrypt.hash(userInfo.password, 12),
                userRole: userInfo.userRole,
                phonenumber: userInfo.phonenumber,
                gender: userInfo.gender,
                image:req.file.path
            };
        }
        else{
            newUser= {
                username: userInfo.username,
                email: userInfo.email,
                password: await bcrypt.hash(userInfo.password, 12),
                userRole: userInfo.userRole,
                phonenumber: userInfo.phonenumber,
                gender: userInfo.gender,
            };
        }
        
        const user = await UserModel.create(newUser);
        if (user) res.status(201).json(user);
    }
    catch (error) {

        console.log(error);

    }
}
router.post('/user',upload,checkUser, createnewUser);

const signIN = async (req, res) => {
    try {

        const userInfo = req.headers.authorization.split(' ')[1];
        const decoded = base64.decode(userInfo);
        const [username, password] = decoded.split(':');
        const user = await UserModel.findOne({ where: { username: username } });
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                return res.status(200).json(user);
            }
            else {
                return res.status(401).json({
                    message: "you are not allow",
                });
            }
        }
        else {
            return res.status(401).json('your password or username is not correct');
        }

    }
    catch (error) {
        console.log(error);
    }
}
router.post('/signin', signIN);

const getAllUsers = async (req, res) => {
    try {
        const user = await UserModel.findAll({ include: { all: true } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
}

router.get('/users',getAllUsers);

const updateCaplities = async (req,res)=>{
    try {
        const id=req.params.id;
        const user=await UserModel.findOne({where:{id}});
       await user.update({
            userRole:'enabledSchool'
        });
        res.status(200).send(user);
         
    } catch (error) {
        console.log(error);
    }
}

router.put('/user/:id',updateCaplities)


module.exports = router;