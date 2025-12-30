const express = require('express')
const appointController = require('../controllers/appointController')
const { auth, doctor } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post("/createAppoint", auth, appointController.createAppoint)

router.patch('/statusUpdateByDoctor/:ID', auth, doctor, appointController.statusUpdateByDoctor)

router.put('/updateAppoint/:ID', auth ,appointController.updateAppoint )

router.delete('/deleteAppoint/:ID', auth, appointController.deleteAppoint)

router.get('/getAppointsByUser', auth, appointController.getAppointsByUser)

router.get('/showAppointsOfDoctor', auth, doctor, appointController.showAppointsOfDoctor)








module.exports = router