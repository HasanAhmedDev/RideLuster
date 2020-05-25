// const notification = require('./')

module.exports = (userConnection) => {
    userConnection.emit('clientIO', {
        msg: "Client Acknowledgment from Server !!!"
    })
}