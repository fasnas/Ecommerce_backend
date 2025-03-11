import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ]
});

const Cart=mongoose.model('Cart',cartSchema)

export default Cart;