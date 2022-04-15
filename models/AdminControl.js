const mongoose = require('mongoose')

const AdminControlSchema = new mongoose.Schema({
    types: {
        type: [String],
        default: ['Sedan', 'Hatchback', 'Truck']
    },
    services: {
        type: [String],
        default: ['Wash', 'Service', 'Maintenance']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = AdminControl = mongoose.model('admincontrol', AdminControlSchema)