import React from 'react';
import Vendor from './Vendor';
import openSocket from 'socket.io-client';

const vendorWrapper = () => {
    const vendorio = openSocket('http://localhost:5000');
    vendorio.emit('vendor', {
        vendorID: '5ec6f619def1f30c04d70f9b',
        msg: "Hi I am Vendor"
    });
    vendorio.on('VendorNotification', res => {
        console.log(res);
    })
    vendorio.on('vendorIO', res => {
        console.log(res);
    })
       
    return <Vendor/>
}
export default vendorWrapper;