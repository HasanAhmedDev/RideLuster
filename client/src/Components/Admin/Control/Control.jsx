import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loadUsers } from '../../../actions/admin';
import axios from 'axios';
const Control = (props) => {
    const isAuthenticated = useSelector((st) => st.userAuth.isAuthenticated);
    const userType = useSelector((st) => st.userAuth.userType);
    useEffect(() => {
        if(isAuthenticated==null && userType!=='admin'){
            return <Redirect to='/login' />;
        }
        getControls();
        getAreas();
    }, []);
  
    const users = useSelector((st) => st.admin.users);
    const [controls, setControls] = React.useState();
    const [areas, setAreas] = React.useState();
    
    const handleDelete=async (id)=>{
        if(id){
            props.loadUsers()
        }
    }

    const getControls = async () => {
        const res=await axios.post(`/api/auth/admin/addControl`)
        console.log(res)
        setControls(res.data.payload[0]);
    }

    const getAreas = async () => {
        const res=await axios.post(`/api/auth/admin/addArea`)
        console.log(res)
        setAreas(res.data.payload);
    }

    const handleAreaSubmit = async () => {
        console.log(document.getElementById('areaInp').value)
        let input = document.getElementById('areaInp').value;
        if(!input) {
            return alert('Please enter a value');
        }
        const res = await axios.post(`/api/auth/admin/addArea`, {area: input});
        console.log(res)
        document.getElementById('areaInp').value = ''
        setAreas(res.data.payload);
    }

    const handleSubmit = async (key) => {
        console.log(key, document.getElementById('vehicleInp').value)
        let input;
        let payload;
        if(key == 'service') {
            input = document.getElementById('serviceInp').value;
            payload = {
                service: input
            }
        } else if(key == 'type') {
            input = document.getElementById('vehicleInp').value;
            payload = {
                type: input
            }
        }
        if(!input) {
            return alert('Please enter a value');
        }
        const res = await axios.post(`/api/auth/admin/addControl`, payload);
        console.log(res)
        document.getElementById('serviceInp').value = ''
        document.getElementById('vehicleInp').value = ''
        setControls(res.data.payload[0]);
    }
  
  return (
      <div style={{width: '60%', padding: '25px 0', margin: '25px auto'}}>
        {
            areas ? 
            (
                <div>
                    <h2 className="ui header">Areas</h2>
                    <div className="ui fluid action input">
                        <input type="text" id='areaInp' placeholder="Add Area..." />
                        <div className="ui button primary" onClick={() => handleAreaSubmit()}>Submit</div>
                    </div>
                    <div className="ui segments">
                    {
                        areas.map(service => {
                            return (
                                <div key={service.name} className="ui segment">
                                    <p>{service.name}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                
            ) : null
        }
        {
            controls ? 
            (
                <div>
                    <h2 className="ui header">Services</h2>
                    <div className="ui fluid action input">
                        <input type="text" id='serviceInp' placeholder="Add Service..." />
                        <div className="ui button primary" onClick={() => handleSubmit('service')}>Submit</div>
                    </div>
                    <div className="ui segments">
                    {
                        controls.services.map(service => {
                            return (
                                <div key={service} className="ui segment">
                                    <p>{service}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                    <h2 style={{margin: '30px 0 15px 0'}} className="ui header">Vehicle Types</h2>
                    <div className="ui fluid action input">
                        <input type="text" id='vehicleInp' placeholder="Add Vehicle Type..." />
                        <div className="ui button primary" onClick={() => handleSubmit('type')}>Submit</div>
                    </div>
                    <div className="ui segments">
                    {
                        controls.types.map(service => {
                            return (
                                <div key={service} className="ui segment">
                                    <p>{service}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                
            ) : null
        }
      </div>
  );
};
export default connect(null,{loadUsers})(Control);
