import { User } from '../models/User.model.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    signup: async (req, res, next) => {
        const user = {
            mail: req.body.mail,
            password: bcryptjs.hashSync(req.body.password, 10),
            is_online: false,
            is_admin: false,
            is_verified: true,
            verify_code: crypto.randomBytes(10).toString('hex'),
        }
        try {
            await User.create(user)
            req.body.succes = true
            req.body.sc = 201
            req.body.data = 'User created successfully'
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    }
}

export default controller