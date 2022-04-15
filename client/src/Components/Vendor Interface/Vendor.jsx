import React, {useState, useEffect} from 'react';
import Nav from '../Utility Components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import { getServiceStation, GetUnhandledRequest } from '../../actions/servicestation';
import ProcessController from './ProcessController';
import './Vendor.css';
import { withRouter } from 'react-router';
import Loader from '../Utility Components/Loader';
import { showLoader } from '../../actions/loader';
const Vendor = props => {
    
    const [state, setState] = useState({
        processName: 'Request',
    });
    const { vendor } = useSelector(st => st);
    let dispatch = useDispatch();
    useEffect(()=>{
        if(!vendor.ssLoaded){
            dispatch(getServiceStation());
        }
    },[])

    
    const switchProcess = (event)=>{
        console.log(event)
        setState({
            ...state,
            processName: event
        });
    }
   
        return (
            <React.Fragment>
                {/* <Loader/> */}
        <div className="main-container">
            <div className="nav-container">
                <Nav/>
                <Panel process={state.processName} click={(e) => switchProcess(e)}/>
            </div>
            <div className="main-render">
                <ProcessController name={state.processName}/>
            
                <Footer/>
            </div>
        </div>
        </React.Fragment>
        );
}
export default withRouter(Vendor);