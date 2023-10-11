const { createToken } = require("../../core/middlewares/tokenProcesses/createToken");
const { User, UserForVerification } = require("../../core/models/user.model");
const APIResponse = require("../../core/utils/response");
const sendEmail = require("../../core/utils/sendMail");
const { getEmailUser } = require("../../core/utils/envVariables")

//Packages
const crypto = require("crypto")
const bcrypt = require("bcrypt")

const emailVerification = async (req, res) => {
    const { personal_email } = req.body
    
    //Check if there is an "user" object using this email
    const user_found = await User.findOne({personal_email}) 

    if (user_found) {
        return new APIResponse(null, "This email has already been taken.", 400).negativeRes(res)
    }

    var user_for_verification = await UserForVerification.findOne({personal_email}) //Either there is or not, get a "user_for_verification" object

    if (!req.body.verification_code) {

        if (user_for_verification) {
            user_for_verification.verified = false
        }

        const verificationCode = crypto.randomInt(0, 10**4-1).toString().padStart(4, "0")

        await sendEmail({
            from : getEmailUser(),
            to : personal_email,
            subject : "Email Verification",
            text : `That's your email verification code : ${verificationCode}`,
        })

        if (user_for_verification) {
            user_for_verification.verification_code = verificationCode
        }
        else {
            user_for_verification = new UserForVerification({
                personal_email : personal_email,
                verification_code : verificationCode,
            })
        }       

        await user_for_verification.save()
        return new APIResponse(null, "Email sent.", 200).positiveRes(res)
    }
    else {

        if (!user_for_verification) {
            return new APIResponse(null, "Unable to verify without sending email.", 401).negativeRes(res)
        }

        const { verification_code } = req.body
    
        if (verification_code != user_for_verification.verification_code) {
            return new APIResponse(null, "Wrong verification code.", 401).negativeRes(res)
        }
        user_for_verification.verified = true
        await user_for_verification.save()

        const token = await createToken(user_for_verification, "180s")

        return new APIResponse({token : token}, "User verification process is successfull.", 200).positiveRes(res)
    }

}

const register = async (req, res) => {
    const {username, firstname, gender, lastname, password} = req.body

    const {personal_email} = req.user

    var user_found = await User.findOne({username})
    if(user_found) return new APIResponse(null, "This username was already taken.", 422).negativeRes(res)

    var password_ = await bcrypt.hash(password, 10)

    var newUser = {
        username,
        personal_email,
        firstname,
        gender,
        lastname,
        password : password_
    }
    
    user_created = new User(newUser)
    await user_created.save()

    await UserForVerification.findOneAndRemove({personal_email})

    const token = await createToken(user_created, "30d")

    result = {
        user : user_created,
        token
    }

    return new APIResponse(result, "The user is created.", 201).positiveRes(res)
}

const usernameCheck = async (req, res) => {
    const { username } = req.query
    
    const users = await User.find({username})

    if (users.length != 0) return new APIResponse(false, "This username was already taken.", 401).negativeRes(res)

    return new APIResponse(true, "This username is avaliable.", 200).positiveRes(res)
}

module.exports = {
    register,
    emailVerification,
    usernameCheck
}