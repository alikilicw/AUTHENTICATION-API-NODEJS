const jwt = require("jsonwebtoken")
const APIResponse = require("../../../core/utils/response")
const { UserForVerification, User } = require("../../../core/models/user.model")
const { getJWTSecretKey } = require("../../utils/envVariables")

const tokenCheckforVerification = async (req, res, next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
    if (!headerToken) {
        return new APIResponse(null, "User token was not found. Please send it.", 401).negativeRes(res)
    }

    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token, getJWTSecretKey(), async (err, decoded) => {
        if (err) return new APIResponse(null, "Invalid token.", 401).negativeRes(res)
        
        const userInfo = await UserForVerification.findById(decoded.sub).select("_id personal_email")

        if (!userInfo) return new APIResponse(null, "Token Error : User was not found.", 401).negativeRes(res)
        req.user = userInfo

        next();
    })
}

const tokenCheck = async (req, res, next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
    if (!headerToken) {
        return new APIResponse(null, "User token was not found. Please send it.", 401).negativeRes(res)
    }

    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token, getJWTSecretKey(), async (err, decoded) => {
        
        if (err) {
            if (err.name === "TokenExpiredError") return new APIResponse(null, "Token expired.", 401).negativeRes(res)
            return new APIResponse(null, "Invalid token.", 401).negativeRes(res)
        }
            
        
        const userInfo = await User.findById(decoded.sub)

        if (!userInfo) return new APIResponse(null, "Token Error : User was not found.", 401).negativeRes(res)
        req.user = userInfo

        next();
    })
}

module.exports = {
    tokenCheckforVerification,
    tokenCheck
}