const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {type: String},
        price: {type: Number},
        type: {type: Schema.Types.ObjectId, ref: "ProductType"},
        inStock: {type: Boolean, default: true}
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Product", productSchema);