const nodeMailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const APIResponse = require("./response")
const path = require("path")
const { getEmailUser, getEmailPass } = require("../utils/envVariables")

const sendEmail = async (mailOptions) => {
    const transporter = nodeMailer.createTransport({
        host : "smtp-mail.outlook.com",
        port : 587,
        secure : false,
        auth : {
            user : getEmailUser(),
            pass : getEmailPass()
        }
    })

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return new APIResponse(info, "Failed to send email.", 500)
        }
        return true
    })
}

module.exports = sendEmail

