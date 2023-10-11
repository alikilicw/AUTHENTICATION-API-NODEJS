const jwt = require("jsonwebtoken")
const { getJWTSecretKey } = require("../../utils/envVariables")

const createToken = async (user, expiresIn) => {
    payload = {
        sub : user._id,
        personal_email : user.personal_email
    }

    const token = await jwt.sign(payload, getJWTSecretKey(), {
        algorithm : "HS512",
        expiresIn
    })

    return token
}

module.exports = {
    createToken
}