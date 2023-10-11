require("dotenv").config();

const getPort = () => {
    return process.env.PORT
}

const getDBUrl = () => {
    return process.env.DB_URL
}

const getEmailUser = () => {
    return process.env.EMAIL_USER
}

const getEmailPass = () => {
    return process.env.EMAIL_PASSWORD
}

const getJWTSecretKey = () => {
    return process.env.JWT_SECRET_KEY
}


module.exports = {
    getPort,
    getDBUrl,
    getEmailUser,
    getEmailPass,
    getJWTSecretKey
}