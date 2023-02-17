import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    coupon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupons',
        required: false,
    },
    total_price: {
        type: Number,
        required: false,
    },
})

export const Cart = mongoose.model('carts', cartSchema)
