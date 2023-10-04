const jwt = require("jsonwebtoken")

const createToken = async (user, expiresIn) => {
    payload = {
        sub : user._id,
        personal_email : user.personal_email
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm : "HS512",
        expiresIn
    })

    return token
}

module.exports = {
    createToken
}