const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema ( 
    {
        items: [
            {
                id: Number,
                _id: false,
                productId: {type: Schema.Types.ObjectId, ref: "Product"},
                name: {type: String},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true},
                total: {type: Number},
            }
        ],
        date: String,
        totalPrice: {type: Number},
        user: {type: Schema.Types.ObjectId, ref: "user"}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bill", billSchema);