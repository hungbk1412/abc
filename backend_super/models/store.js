const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
    {
        name: String,
        address: String
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Store", storeSchema);