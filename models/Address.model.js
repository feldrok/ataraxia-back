import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Address = mongoose.model('address', addressSchema)
