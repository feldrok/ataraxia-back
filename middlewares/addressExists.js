import { Address } from '../models/Address.model.js'
import defaultResponse from '../config/defaultResponse.js'

async function addressExists(req, res, next) {
    const { street } = req.body
    const address = await Address.findOne({ street: street })
    if (!address) {
        return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'Address already exists'
    return defaultResponse(req, res)
}

export default addressExists
