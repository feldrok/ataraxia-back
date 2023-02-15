import defaultResponse from '../config/defaultResponse.js'

const isAdmin = async (req, res, next) => {
    try {
        const { user } = req
        if (user.is_admin === true) {
            return next()
        } else {
            req.body.success = false
            req.body.sc = 400
            req.body.data = 'You are not an admin'
            return defaultResponse(req, res)
        }
    } catch (error) {
        next(error)
        console.log(req)
    }
}
export default isAdmin
