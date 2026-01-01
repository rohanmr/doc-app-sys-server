const express = require('express')
const userController = require('../controllers/userController')
const { auth } = require('../middlewares/authMiddleware')
const upload = require("../middlewares/multer")
const router = express.Router()


router.post("/register", upload.single('userImage'), userController.register)
router.post("/login", userController.login)

router.get("/getUserInfo", auth, userController.getUserInfo)



router.get('/doctorList', auth, userController.doctorList)





module.exports = router