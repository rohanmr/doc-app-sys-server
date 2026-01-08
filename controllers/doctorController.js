const { where } = require("sequelize");
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
        const userID = req.params.userID
        const { status } = req.body

        const doctor = await Doctor.findByPk(userID);

        if (!doctor) {
            return res.status(404).send({ msg: "Doctor not found", success: false, });
        }

        doctor.status = status;
        doctor.updatedBy = req.user.id;
        await doctor.save();
32


        if (status === "Accepted") {

            await User.update({ role: "Doctor" }, { where: { id: doctor.createdBy } });

            return res.status(200).send({ msg: "Doctor Application Approved", success: true, });
        }


        await User.update({ role: "User" }, { where: { id: doctor.createdBy } });

        return res.status(200).send({ msg: "Doctor Application Rejected", success: true, });

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

        return res.status(200).send({ doctors: doctors },)

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

const deleteDoctor = async (req, res) => {
    const ID = req.params.ID
    try {
        const doctor = await Doctor.destroy({ where: { id: ID } })
        if (!doctor) {
            return res.status(400).send({ msg: "Doctors Not Found" })
        }

        return res.status(200).send({ msg: "Applicant deleted successfully" },)

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" });
    }
}
module.exports = { applyDoctor, docStatus, getDoctorApp, updateDoctor, deleteDoctor }