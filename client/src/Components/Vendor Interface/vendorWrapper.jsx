import React, { useEffect} from 'react';
import Vendor from './Vendor';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import {openSocketVendor} from '../../actions/servicestation';
import { showLoader } from '../../actions/loader';
import Loader from '../Utility Components/Loader';
const VendorWrapper = props => {
    const [state, setState] = useState({
        render: null,
        firstMount: false
    })
    let dispatch = useDispatch();

    if(!state.firstMount){
        dispatch(showLoader(true));
        setState({
            ...state,
            firstMount: true
        })
    }
    const { userAuth, vendor }= useSelector(st => st);
    useEffect(()=>{
        if(vendor.vendorSocket === null && userAuth.vendor !== null)
        {
            dispatch(openSocketVendor(userAuth.vendor._id));
        }
        if(vendor.vendorSocket){
            vendor.vendorSocket.on('vendorIO', res => {
                console.log(res, "Called");
            })
            // vendor.vendorSocket.on('VendorNotification', res => {
            //     console.log(res);
            // })
        }
    }) 
    if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
    {
        props.history.replace('login');
    }
    if(vendor.ssLoaded && vendor.ss === null && userAuth.userLoaded && userAuth.isAuthenticated){
        // dispatch(showLoader(true));
        props.history.replace('addSS');
    }
    // if(vendor.ssLoaded && vendor.ss !== null && userAuth.userLoaded && userAuth.isAuthenticated){
    //     if(vendor.ss.photo === 'no-photo.jpg'){
    //         dispatch(showLoader(true));
    //         return <Redirect to="photoUpload"/>
    //     }
    // }
    if(state.render === null && userAuth.userLoaded && userAuth.isAuthenticated) {
        setState({
            ...state,
            render: <Vendor/>
        })
    }
    return( 
        <React.Fragment>
        <Loader/>
        {state.render}
        </React.Fragment>
    );
}
export default VendorWrapper;