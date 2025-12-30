require('dotenv').config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || "3306",
    dialect: 'mysql',
    define: {
        timestamps: true
    },

})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("✅ Database Connected successfully!")

    } catch (error) {
        console.error("❌ Unable to Connect to the Database")
    }
}


const syncDB = async ({ force = false, alter = false } = {}) => {
    try {
        await sequelize.sync({ force, alter })
        console.log('✅ All models were synchronized successfully.');
    } catch (error) {
        console.error('❌ Error syncing models:', error);
    }

}

syncDB()

module.exports = { sequelize, testConnection }