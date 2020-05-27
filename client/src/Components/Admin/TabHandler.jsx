import React from 'react';
import Request from "./Request/Request"
import VendorList from './VendorList/VendorList';
import UserList from './UserList/UserList';
const TabHandler = (prop)=>{

        if(prop.name === 'Request')
        {
            return <Request/>
        }
        else if(prop.name === 'VendorList')
        {
            return <VendorList/>
        }
        else if(prop.name === 'UserList')
        {
            return <UserList/>
        }

}
export default TabHandler;