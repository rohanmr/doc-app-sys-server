const express = require('express')
require('dotenv').config()
const cors = require("cors")
const app = express()

const { testConnection } = require("./config/db")
testConnection()

const userRoute = require('./routes/userRoutes')




app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)


port = process.env.PORT || 7000

app.get("/", (req, res) => {
    res.send({ msg: "Hello from backend doc-sys" })
})


app.listen(port, () => {
    console.log(`Server Ruining On http://localhost:${port}`)
})