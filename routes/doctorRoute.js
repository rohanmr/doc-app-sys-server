const express = require('express')
const { auth, admin } = require('../middlewares/authMiddleware')
const doctorController = require('../controllers/doctorController')

const router = express.Router()


router.post('/apply', auth, doctorController.applyDoctor)
router.post('/docStatus/:userID', auth, admin, doctorController.docStatus)
router.get('/getDocApp', auth, admin, doctorController.getDoctorApp)
// router.patch('/update/:ID',doctorController.updateDoctor)
router.delete('/delete/:ID', doctorController.deleteDoctor)



module.exports = router