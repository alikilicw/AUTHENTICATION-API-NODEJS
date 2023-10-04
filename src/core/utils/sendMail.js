const nodeMailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const APIResponse = require("./response")
const path = require("path")

const sendEmail = async (mailOptions) => {
    const transporter = nodeMailer.createTransport({
        host : "smtp-mail.outlook.com",
        port : 587,
        secure : false,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASSWORD
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

