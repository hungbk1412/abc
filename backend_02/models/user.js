const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        store: {type: Schema.Types.ObjectId, ref: "Store"},
        username: {type: String, required: true, unique: true},
        email: {type: String},
        fullName: String,        
        password: {type: String, required: true},
        birthday: String,
        phone: String,
        isActive: {type: Boolean, default: true},
        salaryRate: Number,
        role_id: {type: Number, default: 1}
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("User", userSchema);