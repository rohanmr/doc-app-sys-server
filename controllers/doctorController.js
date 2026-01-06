const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

const applyDoctor = async (req, res) => {
    try {
        const { Specialist, fees } = req.body
        const createdBy = req.user.id

        const newDoc = await Doctor.create({ Specialist, fees, createdBy })

        if (newDoc) {
            return res.status(200).send({ msg: "Doctor applied successfully", success: true });
        } else {
            return res.status(200).send({ msg: "Doctor not applied successfully", success: false });
        }
    } catch (error) {
        return res.status(500).send({ msg: "Server Error" });
    }
}


const docStatus = async (req, res) => {
    try {
        const DoctorID = req.params.DoctorID

        const getDoctor = await Doctor.findByPk(DoctorID)

        if (!getDoctor) {
            res.status(400).send({ msg: "Doctor not found", success: true })
        } else {

            getDoctor.status = "Accepted";
            await getDoctor.save();

            if (getDoctor) {
                await User.update({ role: "Doctor" }, { where: { id: getDoctor.createdBy } })
            }
            return res.status(200).send({ msg: "Doctor applied successfully", success: true });

        }

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" });
    }
}

const getDoctorApp = async (req, res) => {
    try {
        const doctors = await Doctor.findAll()
        if (!doctors) {
            return res.status(400).send({ msg: "Doctors Not Found" })
        }

        return res.status(200).send({ doctors: doctors })

    } catch (error) {
        res.status(500).send({ msg: "Server Error" });
    }
}

const updateDoctor = (req, res) => {
    try {
        res
            .status(200)
            .send({ msg: "Doctor created successfully", success: true });
    } catch (error) {
        res.status(500).send({ msg: "Server Error" });
    }
}

const deleteDoctor = (req, res) => {
    try {
        res
            .status(200)
            .send({ msg: "Doctor created successfully", success: true });
    } catch (error) {
        res.status(500).send({ msg: "Server Error" });
    }
}
module.exports = { applyDoctor, docStatus, getDoctorApp, updateDoctor, deleteDoctor }