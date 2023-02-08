import { User } from '../models/User.model.js'
import accountVerificationMail from '../middlewares/accountVerificationMail.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import defaultResponse from '../config/defaultResponse.js'
import jwt from "jsonwebtoken"
import sgMail from "@sendgrid/mail"

const controller = {
    signup: async (req, res, next) => {
        const user = {
            name: req.body.name,
            last_name: req.body.lastName,
            dni: req.body.dni,
            mail: req.body.mail,
            password: bcryptjs.hashSync(req.body.password, 10),
            is_online: false,
            is_admin: false,
            is_verified: true,
            verify_code: crypto.randomBytes(10).toString('hex'),
        }
        try {
            const createdUser = await User.create(user)
            await accountVerificationMail(createdUser, res)
            req.body.succes = true
            req.body.sc = 201
            req.body.data = 'Usuario creado con éxito!'
            await sgMail.send(message)
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    verifyCode: async (req, res, next) => {
        const { user_id, verify_code } = req.query
        try {
            const user = await User.findById(user_id)
            if (user.verify_code === verify_code) {
                let consultas = { _id: user_id }
                let update = { is_verified: true }
                const verifiedUser = await User.findOneAndUpdate(
                    consultas,
                    update,
                    {
                        new: true,
                    }
                )
                req.body.success = true
                req.body.sc = 200
                req.body.data = "Usuario verificado!"
                return defaultResponse(req, res)
            } else {
                req.body.success = false
                req.body.sc = 400
                req.body.data = "Hubo un error al verificar tu usuario."
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },

    signin: async (req, res, next) => {
        let { password } = req.body
        let { user } = req
        try {
            const verified = bcryptjs.compareSync(password, user.password)
            if (verified) {
                await User.findOneAndUpdate(
                    { mail: user.mail },
                    { is_online: true },
                    { new: true }
                )
                let token = jwt.sign({ id: user.id }, process.env.KEY_JWT, {
                    expiresIn: 60 * 60 * 24,
                })

                user = {
                    mail: user.mail,
                    id: user.id
                }
                req.body.success = true
                req.body.sc = 200
                req.body.data = { user, token }
                return defaultResponse(req, res)
            }
            req.body.success = false
            req.body.sc = 400
            req.body.data = "Credenciales Inválidas"
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    signintoken: async (req, res, next) => {
        let { user } = req
        try {
            req.body.success = true
            req.body.sc = 200
            req.body.data = { user }
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    signout: async (req, res, next) => {
        const { mail } = req.user
        try {
            await User.findOneAndUpdate(
                { mail },
                { is_online: false },
                { new: true }
            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = "Nos vemos pronto!"
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
}

export default controller