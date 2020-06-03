const moongose = require('mongoose');

const BookingSchema = new moongose.Schema({
    vehicleType: {
        type: String,
        required: [true, 'Vehicle Type is required']
    },
    vehicleMake: {
        type: String,
        required: [true, 'Vehicle Make is required']
    },
    vehicleModel: {
        type: Number,
        required: [true, 'Vehicle Model is required']
    },
    vehicleNo: {
        type: String,
        required: [true, 'Vehicle Number is required']
    },
    serviceType: {
        type: String,
        required: [true, 'Service Type is required'],
        enum: ['Wash', 'Polish', 'Oil Change']
    },
    contactNo: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 12
    },
    client: {
        type: moongose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Client is required'],
    },
    serviceStation: {
        type: moongose.Schema.ObjectId,
        ref: 'servicestation',
        required: [true, 'Sercive Station is required']
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Waiting', 'Active', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startedAt: {
        type: Date
    },
    timeForService: {
        type: Number
    },
    estimatedTime: {
        type: Number
    },
    estimatedStartTime:{
        type:Date
    }
})

module.exports = Booking = moongose.model('booking', BookingSchema);