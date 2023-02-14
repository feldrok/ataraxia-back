import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "product",
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        rating: {
            type: Number,
            required: true,
            ref: "rating",
        }
    },
    { timestamps: true }
)

export const Rating = mongoose.model("rating", ratingSchema)
