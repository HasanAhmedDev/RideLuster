var io = require('./socket');
const Vendor = require('../models/Vendor');
const ServiceStation = require('../models/ServiceStation');
let activeVendors = [];

module.exports = async (vendorConnection, payload) => {
    const serviceStation = await ServiceStation.findOne({
        owner: payload.vendorID
    });
    console.log(serviceStation);
    if(!serviceStation){
        vendorConnection.emit('vendorIO', {
            msg: "Vendor ACknowledgment from Server!!!",
            ssExist: false
        }); 
    }
    else{
        vendorConnection.emit('vendorIO', {
            msg: "Vendor ACknowledgment from Server!!!",
            ssExist: true,
            ss: serviceStation
        });
    }
     
    activeVendors[payload.vendorID] = vendorConnection.id;
    vendorConnection.on('disconnect', () => {
        console.log(`Socket with user ID = ${payload.vendorID} ID = ${vendorConnection.id} Disconnected!!!`);
        activeVendors = activeVendors.splice(payload.vendorID,1);
    })
}
const sendNotificationToVendor = (notify)=>{
    io.getIO().to(activeVendors[notify.receiverID]).emit('VendorNotification', notify.payload);
}
module.exports.sendNotificationToVendor = sendNotificationToVendor