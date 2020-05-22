const mongoose = require('mongoose')
const slugify = require('slugify')

const ServiceStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    slug: String,
    area: {
        type: String,
        required: [true, 'Area is required']
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Closed'
    },
    approved: {
        type: Boolean,
        default: false
    },
    vehicles: {
        type: [String],
        enum: ['Bike', 'Car'],
        required: [true, 'Types of vehicles serverd are required']
    },
    services: {
        type: [String],
        required: [true, 'Types of services provided are required'],
        enum: ['Wash', 'Polish', 'Oil Change'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: [true, 'Location is required'],
            index: '2dsphere'
        }
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 0'],
        max: [5, 'Rating must be at max 5']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'vendor',
        required: [true, 'Owner Id is required']
    }
})

ServiceStationSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    next()
})
module.exports = ServiceStation = mongoose.model('servicestation', ServiceStationSchema)