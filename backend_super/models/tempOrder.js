const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempOrderSchema = new Schema(
    {
        items: [
            {
                id: Number,
                productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
                name: {type: String},
                quantity: {type: Number, required: true},
                note: {type: String},
                price: {type: Number, required: true},
                total: {type: Number}
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TempOrder', tempOrderSchema)