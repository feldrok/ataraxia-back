import { Address } from '../models/Address.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        try {
            const { user } = req
            const address = await Address.create({ 
                user_id: user.id,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                country: req.body.country
            })
            req.body.success = true
            req.body.sc = 201
            req.body.data = address
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_user_addresses: async (req, res, next) => {
        try {
            const { user } = req
            const addresses = await Address.find({ user_id: user.id })
            if (addresses.length === 0) {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'No addresses found'
                return defaultResponse(req, res)
            }
            req.body.success = true
            req.body.sc = 200
            req.body.data = addresses
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_address: async (req, res, next) => {
        try {
            const { id } = req.params
            const address = await Address.findById(id)
            if (!address) {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Address not found'
                return defaultResponse(req, res)
            }
            req.body.success = true
            req.body.sc = 200
            req.body.data = address
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    delete_address: async (req, res, next) => {
        try {
            const { id } = req.params
            const address = await Address.findByIdAndRemove(id)
            if (!address) {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Address not found'
                return defaultResponse(req, res)
            }
            req.body.success = true
            req.body.sc = 200
            req.body.data = ['Address deleted', address]
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    }
}

export default controller
