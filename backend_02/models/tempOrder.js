const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempOrderSchema = new Schema(
    {
        items: [
            {
                _id: false,
                productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
                name: {type: String},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true},
                note: {type: String},
                total: {type: Number},
                served: {type: Boolean, default: false}
            }
        ],
        done: {type: Boolean, default: false},
        totalPrice: {type: Number},
        username: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TempOrder', tempOrderSchema)