import React, {useState, useEffect} from 'react';
import Nav from '../Utility Components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import { getServiceStation } from '../../actions/servicestation';
import ProcessController from './ProcessController';
import './Vendor.css';
import { withRouter } from 'react-router';
import Loader from '../Utility Components/Loader';
import { showLoader } from '../../actions/loader';
const Vendor = props => {
    
    const [state, setState] = useState({
        processName: '',
    });
    const { vendor} = useSelector(st => st);
    let dispatch = useDispatch();
    useEffect(()=>{
        if(!vendor.ssLoaded){
            dispatch(getServiceStation());
        }
        dispatch(showLoader(false));
    },[])

    
    const switchProcess = (event)=>{
        setState({
            ...state,
            processName: event.target.name
        });
    }
   
        return (
            <React.Fragment>
                {/* <Loader/> */}
        <div className="main-container">
            <div className="nav-container">
                <Nav/>
                <Panel click={switchProcess}/>
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