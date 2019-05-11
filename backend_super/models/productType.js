const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeSchema = new Schema(
    {
        type: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("ProductType", productTypeSchema);