const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        store: {type: Schema.Types.ObjectId, ref: "Store"},
        email: {type: String},
        fullName: String,
        birthday: String,
        phone: String,
        isActive: {type: Boolean, default: true},
        salaryRate: Number
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Employee", employeeSchema);