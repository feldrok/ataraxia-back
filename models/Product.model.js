import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    stock: { type: Number, required: true },
    ibu: { type: Number },
    abv: { type: Number },
    container: { type: String },
    ml: { type: Number },
    packSize: { type: Number },
    color: { type: String },
    size: { type: Number },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
})

export const Product = mongoose.model('products', productSchema)
