import defaultResponse from '../config/defaultResponse.js'

async function isAdmin(req, res, next) {
    if (req.is_admin) {
        return next()
    }
    console.log(req.is_admin)
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'you are not allowed'
    return defaultResponse(req, res)
}

export default isAdmin
