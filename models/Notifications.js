const mongoose = require('mongoose');

const notification = new mongoose.Schema({
    allNotifications:{
        type: Array,
        default: []
    },
    active: {
        type: Array,
        default: []
    },
})

const NotificationsSchema = new mongoose.Schema({
    client: {
        type: notification
    },
    vendor: {
        type: notification
    },
    admin: {
        type: notification
    }
});

module.exports = Notifications = mongoose.model('notification', NotificationsSchema);