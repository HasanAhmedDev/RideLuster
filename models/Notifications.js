const mongoose = require('mongoose');


const NotificationsSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.ObjectId
    },
    receiverID: {
        type: mongoose.Schema.ObjectId
    },
    isRead: {
        type: Boolean,
        default: false
    },
    payload: {
        type: Array,
        default: []
    }
});

module.exports = Notifications = mongoose.model('notification', NotificationsSchema);