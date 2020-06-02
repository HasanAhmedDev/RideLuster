var io = require('./socket');
const Vendor = require('../models/Vendor');
const ServiceStation = require('../models/ServiceStation');
let activeVendors = [];

module.exports = async (vendorConnection, payload) => {
    vendorConnection.emit('vendorIO', {
        msg: "Vendor ACknowledgment from Server!!!",
    }); 

     
    activeVendors[payload.vendorID] = vendorConnection.id;
    vendorConnection.on('disconnect', () => {
        console.log(`Socket with user ID = ${payload.vendorID} ID = ${vendorConnection.id} Disconnected!!!`);
        activeVendors = activeVendors.splice(payload.vendorID,1);
    })
}
const sendNotificationToVendor = (notify)=>{
    io.getIO().to(activeVendors[notify.receiverID]).emit('VendorNotification', notify.payload);
}
module.exports.sendNotificationToVendor = sendNotificationToVendor;
