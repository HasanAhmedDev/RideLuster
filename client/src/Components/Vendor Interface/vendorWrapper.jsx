import React, { useEffect} from 'react';
import Vendor from './Vendor';
import openSocket from 'socket.io-client';
import AddServiceStation from './AddServiceStation';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux'

const VendorWrapper = props => {
    const userAuth = useSelector(st => st.userAuth);
    useEffect(()=>{
        if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
        {
            props.history.replace('login');
        }
        if(userAuth.userLoaded){
            const vendorio = openSocket('http://localhost:5000');
            vendorio.emit('vendor', {
                vendorID: userAuth.vendor._id,
                msg: "Hi I am Vendor"
            });
            vendorio.on('vendorIO', res => {
                console.log(res, "Called");
                if(!res.ssExist){
                    props.history.replace('addSS');
                }
                else{
                    props.history.replace('vendorDashboard');
                }
            })
            vendorio.on('VendorNotification', res => {
                console.log(res);
            })
        }
    })  
    
    return <React.Fragment></React.Fragment>
}
export default VendorWrapper;