const mongoose = require('mongoose')

const AreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = Area = mongoose.model('area', AreaSchema)