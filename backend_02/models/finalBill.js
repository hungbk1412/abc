const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const finalBillSchema = new Schema ( 
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
        vat: Number,
        discount: Number,
        date: String,
        totalPrice: {type: Number}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FinalBill", finalBillSchema);