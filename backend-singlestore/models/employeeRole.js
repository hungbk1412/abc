const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeRoleModel = new Schema(
    {
        role: {type: String} 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.exports("Role", employeeRoleModel);