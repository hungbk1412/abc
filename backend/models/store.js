const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeModel = new Schema(
    {
        name: String
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Store", storeModel);