const router = require("express").Router()
const forgetPassword = require("../controllers/forgetPassword.controller")
const login = require("../controllers/login.controller")
const { register, emailVerification, usernameCheck } = require("../controllers/register.controller.js")
const { tokenCheck, tokenCheckforVerification } = require("../../core/middlewares/tokenProcesses/tokenCheck")
const AuthValidation = require("../../core/middlewares/validations/user.validation")

router.post("/user-verification", AuthValidation.emailVerification, emailVerification)

router.post("/register", AuthValidation.register, tokenCheckforVerification, register)

router.post("/login", AuthValidation.login, login)

router.get("/username-check", AuthValidation.username, usernameCheck)

router.post("/forget-password", (req, res, next) => {
    if (req.body.password) {
        return tokenCheck(req, res, next)
    }
    else next()
}, forgetPassword)



module.exports = router