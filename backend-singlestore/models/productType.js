const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeModel = new Schema(
    {
        type: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("ProductType", productTypeModel);