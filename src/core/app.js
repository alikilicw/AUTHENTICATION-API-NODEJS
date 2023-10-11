const express = require("express")
const app = express()
require("dotenv").config()
require("./configs/dbConnection")
const path = require("path")
const { getPort } = require("../core/utils/envVariables")

//Middleware
app.use(express.json())

//Router Defining
const router = require("./router")
app.use("/api/v1", router)

app.get("/", (req, res) => {
    res.json({
        message : "Welcome.."
    })
})

port = getPort() || 5000
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})