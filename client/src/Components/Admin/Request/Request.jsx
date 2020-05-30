import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Request.css';
import { connect, useSelector } from 'react-redux';
import { loadRequests } from '../../../actions/admin';
import axios from 'axios'

const Request = (props) => {
  let showreqs;
  const isAuthenticated = useSelector((st) => st.userAuth.isAuthenticated);
  const userType = useSelector((st) => st.userAuth.userType);
  useEffect(() => {
    props.loadRequests();
  }, []);

  const requests = useSelector((st) => st.admin.ssRequests);
 
 const handleDelete=async (id)=>{
     if(id){
        const res=await axios.delete(`/api/auth/admin/deleteservicestation/${id}`)
        console.log(res)
        props.loadRequests()
     }
 }
 const handleapprove=async(id)=>{
     if(id){
        const res=await axios.put(`/api/auth/admin/approveservicestation/${id}`)
        console.log(res)
        props.loadRequests()
     }
 }

  if (requests) {
    showreqs = requests.map((d) => (
      <div key={d._id} className='r-tabs'>
        <h5>{`Name :${d.name} | Area:${d.area}| Owner:${d.owner.name}`}</h5>
        <div className='btn-group'>
          <button onClick={() => handleapprove(`${d._id}`)}>APPROVE</button>
          <button className='danger' onClick={() => handleDelete(`${d._id}`)}>DELETE</button>
        </div>
      </div>
    ));
  }else{
      showreqs=<div className="noreq"><h5>No Request Registered</h5></div>
  }

  return (
    <div className='req'>
      <h3 className='ui block header'>ACTIVE REQUESTS</h3>
      <div className='m-req'>{showreqs}</div>
    </div>
  );
};
export default connect(null, { loadRequests })(Request);
