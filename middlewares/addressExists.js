import { Address } from '../models/Address.model.js'
import defaultResponse from '../config/defaultResponse.js'

async function addressExists(req, res, next) {
    const { user } = req
    const { street } = req.body
    const address = await Address.findOne({ user_id: user.id, street: street })
    const addresses = await Address.find({ user_id: user.id })
    console.log(addresses)
    if (!address && addresses.length < 4) {
        return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'Address already exists'
    return defaultResponse(req, res)
}

export default addressExists
