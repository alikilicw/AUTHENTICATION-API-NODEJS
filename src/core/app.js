const express = require("express")
const app = express()
require("dotenv").config()
require("./configs/dbConnection")
const path = require("path")

//Middleware
app.use(express.json())

// process.env.TZ = "Europe/Istanbul"
const port = process.env.PORT || 5000

//Router Defining
const router = require("./router")
app.use("/api", router)

app.get("/", (req, res) => {
    res.json({
        message : "Hoş Geldiniz.."
    })
})


app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
})