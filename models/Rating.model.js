import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products",
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        rating: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)

export const Rating = mongoose.model("ratings", ratingSchema)
