import defaultResponse from '../config/defaultResponse.js'
import { User } from '../models/User.model.js'

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ is_admin: true })
        if (user.is_admin == false) {
            req.body.success = false
            req.body.message = 'You are not an admin'
            return res
                .status(defaultResponse.status)
                .json(defaultResponse.message)
        }
        req.user = user
        next()
        console.log(user.is_admin)
    } catch (error) {
        next(error)
    }
}
export default isAdmin
