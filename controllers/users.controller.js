import { User } from '../models/User.model.js'
import accountVerificationMail from '../middlewares/accountVerificationMail.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import defaultResponse from '../config/defaultResponse.js'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const controller = {
    signup: async (req, res, next) => {
        const { verify_password, password } = req.body
        if (verify_password !== password) {
            req.body.success = false
            req.body.sc = 400
            req.body.data = 'Las contraseñas no coinciden'
            return defaultResponse(req, res)
        }
        const user = {
            name: req.body.name,
            lastName: req.body.lastName,
            dni: req.body.dni,
            mail: req.body.mail,
            password: bcryptjs.hashSync(req.body.password, 10),
            is_online: false,
            is_admin: false,
            is_verified: false,
            verify_code: crypto.randomBytes(10).toString('hex'),
        }
        try {
            const createdUser = await User.create(user)
            req.body.success = true
            req.body.sc = 201
            req.body.data = 'Usuario creado con éxito!'
            await accountVerificationMail(createdUser, res)
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
                req.body.data = 'Usuario verificado!'
                return defaultResponse(req, res)
            } else {
                req.body.success = false
                req.body.sc = 400
                req.body.data = 'Hubo un error al verificar tu usuario.'
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
                    id: user.id,
                }
                req.body.success = true
                req.body.sc = 200
                req.body.data = { user, token }
                return defaultResponse(req, res)
            }
            req.body.success = false
            req.body.sc = 400
            req.body.data = 'Contraseña incorrecta'
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    signintoken: async (req, res, next) => {
        try {
            const { user } = req
            let { token } = req.body
            token = jwt.verify(token, process.env.KEY_JWT)
            req.body.success = true
            req.body.sc = 200
            req.body.data = { user, token }
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
            req.body.data = 'Nos vemos pronto!'
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    get_profile_data: async (req, res, next) => {
        const { user } = req
        try {
            let consultas = { _id: user.id }
            let user_data = await User.findOne(consultas).select('-password -verify_code -is_verified -__v')
            req.body.success = true
            req.body.sc = 200
            req.body.data = user_data
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                sc: 200,
                data: 'Usuario eliminado con éxito!',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default controller
