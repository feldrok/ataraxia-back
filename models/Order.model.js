import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    cart_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    statusOrder: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

export const Order = mongoose.model('order', orderSchema)
