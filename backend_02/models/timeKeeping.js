const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeKeepingSchema = new Schema(
    {
        date: String,
        employee: {type: Schema.Types.ObjectId, ref: "Employee"},
        start: String,
        end: String,
        total: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('TimeKeeping', timeKeepingSchema);