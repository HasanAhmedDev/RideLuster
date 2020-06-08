const notification = require('../models/Notifications');
// const User = require('../models/User');
const Booking = require('../models/Booking');
var io = require('./socket');
let activeUsers = [];
module.exports = (userConnection, payload) => {
    notification.find({
        receiverID: payload.clientID,
        isRead: false
    }).then((notifications)=>{
        userConnection.emit('clientIO', {
            msg: "Client Acknowledgment from Server !!!",
        }).emit('loggedInNotification',{
            unreadNotifications: notifications
        })
    })
    
    activeUsers[payload.clientID] = userConnection.id;
    

    userConnection.on('readNotifications',(notifs) =>{
        notifs.map((noti)=>{
            console.log(noti._id);
            notification.findByIdAndUpdate({_id:noti._id}, {isRead: true}).then((res)=>{
            })
        })

        // console.log('NNNNNN', notifs);
    })

    userConnection.on('activeServices', (id)=>{
        Booking.find({
            client: id,
            status: ['Active', 'Pending', 'Waiting']
        }).then((res)=>{
            console.log(res);
            userConnection.emit('inProcessServices', res);
        })
    })

    userConnection.on('disconnect', () => {
        console.log(`Socket with ID = ${userConnection.id} Disconnected!!!`);
        activeUsers = activeUsers.splice(payload.clientID, 1);
    })
    
}
const sendNotificationToClient = (notify)=>{
    notification.find({
        receiverID: notify.receiverID,
        isRead: false
    }).then((notifications)=>{
        io.getIO().to(activeUsers[notify.receiverID]).emit('loggedInNotification',{
            unreadNotifications: notifications
        })
    })
    io.getIO().to(activeUsers[notify.receiverID]).emit('clientNotification', notify.payload);
}
module.exports.sendNotificationToClient = sendNotificationToClient