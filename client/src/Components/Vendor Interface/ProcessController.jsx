import React from 'react'
import ActiveProcess from './Active Process/ActiveProcess';
import WaitingList from './Waiting Queue/WaitingList';
import Completed from './Completed Process/Completed';
import RequestHandler from './Request Handler/RequestHandler';
const ProcessController = (prop)=>{

    
    if(prop.name === 'Active'){
        return <ActiveProcess/>
    }
    else if(prop.name === 'Waiting'){
        return <WaitingList/>
    }
    else if(prop.name === 'Completed'){
        return <Completed/>
    }
    else{
        return <RequestHandler/>
    }
}
export default ProcessController;