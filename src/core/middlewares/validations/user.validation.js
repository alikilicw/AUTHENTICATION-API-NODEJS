const joi = require("joi")
const APIResponse = require("../../../core/utils/response")

class AuthValidation {
    constructor() {}

    static emailVerification = async (req, res, next) => {
        try {
            if (!req.body.verification_code) {
                await joi.object({
                    personal_email : joi.string().email().trim().min(5).max(320).required(),
                }).validateAsync(req.body)
            }
            else {
                await joi.object({
                    personal_email : joi.string().email().trim().min(5).max(320).required(),
                    verification_code : joi.string().trim().min(4).max(4).required(),
                }).validateAsync(req.body)
            }
        }catch(error) {
            if (error.details && error?.details[0].message) {
                return new APIResponse(null, error.details[0].message, 400).negativeRes(res)
            }
            else {
                return new APIResponse(null, "Please perform the validation rules..", 400).negativeRes(res)
            }
        }
        next();
    }

    static register = async (req, res, next) => {
        try {
            await joi.object({
                username : joi.string().trim().min(5).max(20).required(),
                firstname : joi.string().trim().min(5).max(50).required(),
                lastname : joi.string().trim().min(5).max(50).required(),
                gender : joi.string().trim().min(3).max(6).required(),
                password : joi.string().trim().min(5).max(20).required(),
            }).validateAsync(req.body)
        }catch(error) {
            if (error.details && error?.details[0].message) {
                return new APIResponse(null, error.details[0].message, 400).negativeRes(res)
            }
            else {
                return new APIResponse(null, "Please perform the validation rules..", 400).negativeRes(res)
            }
        }
        next();
    }

    static login = async (req, res, next) => {
        try {
            if (!req.body.username) {
                await joi.object({
                    personal_email : joi.string().email().trim().min(5).max(320).required(),
                    password : joi.string().trim().min(5).max(20).required(),
                }).validateAsync(req.body)
            }
            else {
                await joi.object({
                    username : joi.string().trim().min(5).max(20).required(),
                    password : joi.string().trim().min(5).max(20).required(),
                }).validateAsync(req.body)
            }
        }catch(error) {
            if (error.details && error?.details[0].message) {
                return new APIResponse(null, error.details[0].message, 400).negativeRes(res)
            }
            else {
                return new APIResponse(null, "Please perform the validation rules..", 400).negativeRes(res)
            }
        }
        next();
    }

    static username = async (req, res, next) => {
        try {
            await joi.object({
                username : joi.string().trim().min(5).max(20).required(),
            }).validateAsync(req.query)
            
        }catch(error) {
            if (error.details && error?.details[0].message) {
                return new APIResponse(null, error.details[0].message, 400).negativeRes(res)
            }
            else {
                return new APIResponse(null, "Please send a valid username..", 400).negativeRes(res)
            }
        }
        next()
    }
}

module.exports = AuthValidation