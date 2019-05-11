const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempOrderSchema = new Schema(
    {
        items: [
            {
                id: Number,
                _id: false,
                productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
                name: {type: String},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true},
                note: {type: String},
                total: {type: Number},
                served: {type: Boolean}
            }
        ],
        totalPrice: {type: Number},
        table: {type: Schema.Types.ObjectId, ref: "user"}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TempOrder', tempOrderSchema)