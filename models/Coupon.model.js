import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
})

export const Coupon = mongoose.model("coupons", couponSchema)