const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema ( 
    {
        items: [
            {
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
        username: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bill", billSchema);