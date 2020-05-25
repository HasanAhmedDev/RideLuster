module.exports = (vendorConnection) => {
    vendorConnection.emit('vendorIO', {
        msg: "Vendor ACknowledgment from Server!!!"
    }); 

}