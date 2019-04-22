const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workRate = new Schema(
    {
        time: {type: String},
        totalHour: {type: Number},
        totalSalary: {type: Number}
    },
    {
        timestamps: true
    }
)

const employeeModel = new Schema(
    {
        fullName: {type: String},
        password: {type: String},        
        birthday: {type: String},
        idCard: {type: String},
        startDate: {type: String},
        role: {type: Schema.Types.ObjectId, ref: "Role"},
        isActive: {type: Boolean, default: true},
        salaryRate: {type: Number},
        note: {type: [String], default: []},
        workRate: {type: [workRate], default: []}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.exports("Employee", employeeModel);