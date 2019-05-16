const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
    {
        cost: Number,
        type: String,
        date: String,
        month: String,
        description: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Expense', expenseSchema);