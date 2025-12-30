const Appointment = require("../models/appointModel")

const createAppoint = async (req, res) => {

    const { dateTime, doctorId } = req.body

    try {

        const formattedDate = new Date(dateTime + 'Z');

        const newAppoint = await Appointment.create({ dateTime: formattedDate, doctorId, createdBy: req.user.id })

        if (!newAppoint) {
            return req.status(400).send({ msg: "Appointment not created" })
        }

        return res.status(201).send({ msg: "Appointment Created Successfully." })


    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error" })
    }

}

const getAppointsByUser = async (req, res) => {
    const userId = req.user.id
    try {
        const appointments = await Appointment.findAll({ where: { createdBy: userId } })

        if (appointments.length == 0) {
            return res.status(400).send({ msg: "No appointment yet" })
        }

        return res.status(200).send({ appointments: appointments })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }
}

const statusUpdateByDoctor = async (req, res) => {
    const { ID } = req.params
    const { status } = req.body
    try {
        const updatedStatus = await Appointment.update({ status: status, updatedBy: req.user.id }, { where: { id: ID } })

        if (updatedStatus.length == 0) {
            return res.status(400).send({ msg: "Appointment not Updated" })
        }

        return res.status(200).send({ msg: "Appointment status updated successfully." })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }
}


const showAppointsOfDoctor = async (req, res) => {

    const doctorId = req.user.id

    try {
        if (!doctorId) {
            return res.status(400).send({ msg: "No Doctor Found" })
        }
        const appointment = await Appointment.findAll({ where: { doctorId: doctorId } })

        if (appointment.length == 0) {
            return res.status(400).send({ msg: "No Appointment yet" })
        }

        return res.status(200).send({ appointment: appointment })

    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error" })

    }


}

const updateAppoint = async (req, res) => {
    const { ID } = req.params;
    const { dateTime, doctorId } = req.body;

    try {

        if (!dateTime || !doctorId) {
            return res.status(400).json({ msg: "DateTime and doctor are required" });
        }

        const formattedDate = new Date(dateTime + 'Z');

        const [updatedAppoint] = await Appointment.update({ dateTime: formattedDate, doctorId, }, { where: { id: ID }, }
        );

        if (updatedAppoint === 0) {
            return res.status(404).json({ msg: "Appointment not found or not updated" });
        }

        return res.status(200).json({ msg: "Appointment updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};




const deleteAppoint = async (req, res) => {
    const { ID } = req.params
    try {

        const deleteAppoint = await Appointment.destroy({ where: { id: ID } })

        if (!deleteAppoint) {
            return res.status(400).send({ msg: "Appointment not found" })
        }

        return res.status(200).send({ msg: "Appointment Deleted Successfully" })


    } catch (error) {

        return res.status(500).send({ msg: "Internal Server Error" })

    }

}




module.exports = {
    createAppoint,
    getAppointsByUser,
    statusUpdateByDoctor,
    showAppointsOfDoctor,
    updateAppoint,
    deleteAppoint
}