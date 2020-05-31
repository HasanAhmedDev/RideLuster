import React, {useState, useEffect} from 'react';
import Nav from '../Utility Components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import Panel from './Control Panel/Panel';
import Footer from '../Footer/Footer';
import { getServiceStation } from '../../actions/servicestation';
import ProcessController from './ProcessController';
import './Vendor.css';
import { Redirect } from 'react-router';
const Vendor = props => {
    
    const [state, setState] = useState({
        processName: '',
        render: null
    });
    const {userAuth, vendor} = useSelector(st => st);
    let dispatch = useDispatch();
    useEffect(()=>{
        if(!vendor.ssLoaded){
            dispatch(getServiceStation());
        }
        console.log("USE EFFECT", vendor.ss)
    })
    if((!userAuth.isAuthenticated || userAuth.userType !== 'vendor') && userAuth.userLoaded)
            props.history.replace('login');
    if(vendor.ssLoaded && vendor.ss === null){
        props.history.replace('addSS');
    }
    if(vendor.ssLoaded && vendor.ss !== null){
        if(vendor.ss.photo === 'no-photo.jpg'){
            // props.history.replace('addSS');
            console.log(props)
            return <Redirect to="photoUpload"/>
        }
    }
    const switchProcess = (event)=>{
        setState({
            ...state,
            processName: event.target.name
        });
    }
    if(userAuth.userLoaded && vendor.ssLoaded && vendor.ss !== null && state.render === null)
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
   
        return state.render;
}
export default Vendor;