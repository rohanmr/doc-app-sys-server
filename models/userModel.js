const { sequelize } = require("../config/db")
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')


const User = sequelize.define("User", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("User", "Doctor", "Admin"),
        defaultValue: "User"
    }
}, { timestamps: true, tableName: "Users" })

User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

module.exports = User 