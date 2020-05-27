// const notification = require('./')
var io = require('./socket');
let activeUsers = [];
module.exports = (userConnection, payload) => {
    userConnection.emit('clientIO', {
        msg: "Client Acknowledgment from Server !!!"
    })
    activeUsers[payload.clientID] = userConnection.id;
    userConnection.on('disconnect', () => {
        console.log(`Socket with ID = ${userConnection.id} Disconnected!!!`);
        activeUsers = activeUsers.splice(payload.clientID, 1);
    })
    
}
const sendNotificationToClient = (notify)=>{
    io.getIO().to(activeUsers[notify.receiverID]).emit('clientNotification', notify.payload);
}
module.exports.sendNotificationToClient = sendNotificationToClient