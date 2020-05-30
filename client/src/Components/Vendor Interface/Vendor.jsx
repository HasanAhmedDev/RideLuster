import React, {useState} from 'react';
import Nav from '../Utility Components/Nav';
import { useSelector } from 'react-redux';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import ProcessController from './ProcessController';
import './Vendor.css';
import { Redirect } from 'react-router';
const Vendor = props => {
    const [ProcessName, setProcessName] = useState();
    const userAuth = useSelector(st => st.userAuth);
    if((!userAuth.isAuthenticated || userAuth.userType != 'vendor') && userAuth.userLoaded)
      props.history.replace('login');
    const switchProcess = (event)=>{
        setProcessName(event.target.name);
    }
        return(
            <div className="main-container">
                <div className="nav-container">
                    <Nav/>
                    <Panel click={switchProcess}/>
                </div>
                <div className="main-render">
                    <ProcessController name={ProcessName}/>
                   
                    <Footer/>
                </div>
                
            </div>
            
        )
}
export default Vendor;