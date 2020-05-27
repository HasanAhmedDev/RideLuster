import React, {useState} from 'react';
import Nav from '../Utility Components/Nav';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import ProcessController from './ProcessController';
import './Vendor.css';
const Vendor = props => {
    const [ProcessName, setProcessName] = useState();
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