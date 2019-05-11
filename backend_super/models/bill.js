const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema ( 
    {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
                name: {type: String},
                quantity: {type: Number, required: true},
                note: {type: String},
                price: {type: Number, required: true},
                total: {type: Number},
                store: {type: Schema.Types.ObjectId, ref: "Store"}
            }
        ],
        totalPrice: {type: Number},
        user: {type: Schema.Types.ObjectId, ref: "user"}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bill", billSchema);