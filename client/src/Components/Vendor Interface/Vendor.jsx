import React, {useState, useEffect} from 'react';
import Nav from '../Utility Components/Nav';
import { useSelector } from 'react-redux';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import ProcessController from './ProcessController';
import './Vendor.css';
import { Redirect } from 'react-router';
const Vendor = props => {
    const [state, setState] = useState({
        processName: '',
        render: null
    });
    const userAuth = useSelector(st => st.userAuth);
    
    useEffect(()=>{
        if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
            props.history.replace('login');
        if(userAuth.isAuthenticated && userAuth.userType === 'vendor' && userAuth.userLoaded)
        {
            const template = (<div className="main-container">
                <div className="nav-container">
                    <Nav/>
                    <Panel click={switchProcess}/>
                </div>
                <div className="main-render">
                    <ProcessController name={state.processName}/>
                
                    <Footer/>
                </div>
                
            </div>)
            setState({
                ...state,
                render: template
            })
        }
    })
    const switchProcess = (event)=>{
        setState({
            ...state,
            processName: event.target.name
        });
    }
        return state.render;
}
export default Vendor;