
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


BASEURL = `${process.env.URL}/uploads/`


const register = async (req, res) => {

    const { fullName, email, password, contactNumber, address, } = req.body

    const imagePath = req.file ? req.file.filename : null

    try {

        if (!fullName || !email || !password) {
            return res.status(202).send({ msg: "Please provide name, email and password" })
        }

        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            return res.status(409).send({ msg: "User already exists" })
        }

        await User.create({ fullName, email, password, contactNumber, address, imagePath })

        return res.status(201).send({ msg: "User Registered Successfully" })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const getUser = await User.findOne({ where: { email: email } })

        if (!getUser) {
            return res.status(400).send({ msg: "Invalid Credentials" })
        }

        const checkPassword = await bcrypt.compare(password, getUser.password)

        if (!checkPassword) {
            return res.status(400).send({ msg: "Invalid Credentials" })
        }

        const loggedUser = {
            id: getUser.id,
            role: getUser.role
        }

        const token = jwt.sign(loggedUser, process.env.SECRET_KEY)

        return res.status(200).send({ msg: "User logged in successfully", token: token })


    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }


}


const getUserInfo = async (req, res) => {

    const userId = req.user.id

    try {

        if (!userId) {
            return res.status(400).send({ msg: "User not found" })
        }

        const userInfo = await User.findOne({ where: { id: userId }, attributes: ['id', 'fullName', 'email', 'address', 'contactNumber', 'role', 'imagePath'] })

        userInfo.imagePath = BASEURL + userInfo.imagePath

        return res.status(200).send({ user: userInfo })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }

}

const doctorList = async (req, res) => {
    try {

        const doctors = await User.findAll({ where: { role: "Doctor" }, attributes: ['id', 'fullName', 'email', 'contactNumber', 'address'] })

        if (!doctors) {
            return res.status(400).send({ msg: "Something went wrong" })
        }

        return res.status(200).send({ doctors: doctors })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }

}
const userList = async (req, res) => {
    try {

        const users = await User.findAll({ where: { role: "User" }, attributes: ['id', 'fullName', 'email', 'contactNumber', 'address'] })

        if (!users) {
            return res.status(400).send({ msg: "Something went wrong" })
        }

        return res.status(200).send({ users: users })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }

}

const deleteUser = async (req, res) => {

    const ID = req.params.ID

    try {

        const deletedUser = await User.destroy({ where: { id: ID } })

        if (!deletedUser) {
            return res.status(400).send({ msg: "User Not Found" })
        }

        return res.status(200).send({ msg: " User deleted successfully" })

    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" })

    }
}

const updateUser = async (req, res) => {
    const ID = req.params.ID
    const { name, email, contactNumber, address } = req.body

    try {
        const [updatedUser] = await User.update({ name, email, contactNumber, address }, { where: { id: ID } })

        if (updatedUser === 0) {
            return res.status(404).send({ msg: "User Not Found" })
        }

        return res.status(200).send({ msg: "User updated Successfully", success: true })


    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", success: false })
    }
}


module.exports = { register, login, getUserInfo, doctorList, userList, deleteUser, updateUser }