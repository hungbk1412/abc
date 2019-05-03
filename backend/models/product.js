const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
    {
        name: {type: String},
        price: {type: Number},
        type: {type: String, default: 'Chưa phân loại'}
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Product", productModel);