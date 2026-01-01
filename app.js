const express = require('express')
require('dotenv').config()
const cors = require("cors")
const app = express()

const { testConnection } = require("./config/db")
testConnection()

const userRoute = require('./routes/userRoutes')
const appointmentRoute = require('./routes/appointmentRouter')



app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)
app.use("/api/appoint", appointmentRoute)
app.use('/uploads', express.static('uploads'));


port = process.env.PORT || 7000



app.listen(port, () => {
    console.log(`Server Ruining On http://localhost:${port}`)
})