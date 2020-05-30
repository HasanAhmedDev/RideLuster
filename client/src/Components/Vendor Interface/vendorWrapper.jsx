import React, { useEffect} from 'react';
import openSocket from 'socket.io-client';
import Vendor from './Vendor';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';

const VendorWrapper = props => {
    const [state, setState] = useState({
        render: null
    })
    const { userAuth }= useSelector(st => st);

    useEffect(()=>{
        console.log("USE EFFECT");
        
        if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
        {
            props.history.replace('login');
        }
        if(userAuth.userLoaded && userAuth.isAuthenticated && userAuth.userType === 'vendor' && state.render === null){
            const vendorio = openSocket('http://localhost:5000');
            vendorio.emit('vendor', {
                vendorID: userAuth.vendor._id,
                msg: "Hi I am Vendor"
            });
            vendorio.on('vendorIO', res => {
                console.log(res, "Called");
            })
            vendorio.on('VendorNotification', res => {
                console.log(res);
            })
            setState({
                ...state,
                render: <Vendor/>
            })
        }
    })  
    return state.render;
}
export default VendorWrapper;