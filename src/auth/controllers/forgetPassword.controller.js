const { createToken } = require("../../core/middlewares/tokenProcesses/createToken");
const { User, UserForVerification } = require("../../core/models/user.model");
const APIResponse = require("../../core/utils/response");
const sendEmail = require("../../core/utils/sendMail");
const crypto = require("crypto")
const bcrypt = require("bcrypt")

const forgetPassword = async (req, res) => {
    const { personal_email } = req.body
    const user = await User.findOne({personal_email})

    if(!user && !req.body.password) return new APIResponse(null, "User was not found.", 404).negativeRes(res)

    if (!req.body.forgetpasscode && !req.body.password) {

        var a = crypto.randomInt(0, 9).toString()
        var b = a + crypto.randomInt(0, 9).toString()
        var c = b + crypto.randomInt(0, 9).toString()
        var d = c + crypto.randomInt(0, 9).toString()

        const forgetpassCode = d

        await sendEmail({
            from : "sozial_university@outlook.com",
            to : personal_email,
            subject : "Forgot Password",
            text : `That's your code : ${forgetpassCode}`,
        })

        user.forgetpasscode = forgetpassCode
        user.save()
        return new APIResponse(null, "Email sent.", 200).positiveRes(res)
    }
    else if (!req.body.password){

        const { forgetpasscode } = req.body
        if (forgetpasscode != user.forgetpasscode) {
            return new APIResponse(null, "Wrong verification code.", 401).negativeRes(res)
        }

        const token = await createToken(user, "180s")

        user.forgetpasscode = undefined
        user.save()

        return new APIResponse({token : token}, "Codes match.", 200).positiveRes(res)

    }
    else {
        const { password } = req.body
        const userWhoComeFromToken = req.user

        var password_ = await bcrypt.hash(password, 10)

        userWhoComeFromToken.password = password_
        
        userWhoComeFromToken.save()

        return new APIResponse(null, "Password upgrading is successfull.", 200).positiveRes(res)
    }

}

module.exports = forgetPassword