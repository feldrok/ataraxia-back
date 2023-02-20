import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.ObjectId,
            ref: 'users',
            required: true,
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
        statusOrder: {
            type: String,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        preference_id: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export const Order = mongoose.model('order', orderSchema)
