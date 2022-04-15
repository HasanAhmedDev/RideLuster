import React from 'react';
import Request from "./Request/Request"
import VendorList from './VendorList/VendorList';
import UserList from './UserList/UserList';
import Control from './Control/Control';
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
        else if(prop.name === 'Control')
        {
            return <Control/>
        }

}
export default TabHandler;