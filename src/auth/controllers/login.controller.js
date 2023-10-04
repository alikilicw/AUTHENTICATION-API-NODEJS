const { createToken } = require("../../core/middlewares/tokenProcesses/createToken");
const { User } = require("../../core/models/user.model");
const APIResponse = require("../../core/utils/response");
const bcrypt = require("bcrypt")

const login = async (req, res) =>  {
    const { password } = req.body
    if (req.body.personal_email) {

        const { personal_email } = req.body

        user_found = await User.findOne({personal_email})

        if (!user_found) return new APIResponse(null, "There is no corresponding user in this email.", 401).negativeRes(res)

        const password_comp = await bcrypt.compare(password, user_found.password)
        
        if (!password_comp) return new APIResponse(null, "Email and password do not match.", 401).negativeRes(res)

        const token = await createToken(user_found, "30d")

        result = {
            user : user_found,
            token : token
        }
    }
    else {
        
        const { username } = req.body

        user_found = await User.findOne({username})

        if (!user_found) return new APIResponse(null, "There is no corresponding user in this username.", 401).negativeRes(res)

        
        const password_comp = await bcrypt.compare(password, user_found.password)
        
        if (!password_comp) return new APIResponse(null, "Username and password do not match.", 401).negativeRes(res)

        const token = await createToken(user_found, "30d")

        result = {
            user : user_found,
            token : token
        }
    }
    return new APIResponse(result, "Login process is successfull.", 200).positiveRes(res)
}



module.exports = login