const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyRevenueModel = new Schema (
    {
        date: {type: String},
        revenue: {type: Number}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("DailyRevenue", dailyRevenueModel);