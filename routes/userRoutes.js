const express = require('express')
const userController = require('../controllers/userController')
const { auth, admin } = require('../middlewares/authMiddleware')
const upload = require("../middlewares/multer")
const router = express.Router()


router.post("/register", upload.single('userImage'), userController.register)
router.post("/login", userController.login)

router.get("/getUserInfo", auth, userController.getUserInfo)

router.patch('/updateProfile', auth, upload.single('image'), userController.updateProfile)

router.put("/updateUser/:ID", auth, userController.updateUser)

router.get('/userList', auth, admin, userController.userList)

router.delete('/deleteUser/:ID', auth, admin, userController.deleteUser)

router.get('/doctorList', auth, userController.doctorList)





module.exports = router