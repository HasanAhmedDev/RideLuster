import React, { useEffect } from 'react';
import './Request.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { loadRequests } from '../../../actions/admin';
import axios from 'axios'
let once = false;
const Request = (props) => {
  let showreqs;
  const {userAuth} = useSelector(st => st);

  // const isAuthenticated = useSelector((st) => st.userAuth.isAuthenticated);
  // const userType = useSelector((st) => st.userAuth.userType);
  let dispatch = useDispatch()
  useEffect(() => {
    if(userAuth.isAuthenticated && !once)
      dispatch(loadRequests());
    once = true;
  });

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
        axios.put(`/api/auth/admin/approveservicestation/${id}`).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        props.loadRequests()
     }
 }

  if (requests) {
    showreqs = requests.map((d) => (
      <div key={d._id} className='r-tabs'>
        <h5 style={{wordSpacing: '2px'}}>
          {`Name: ${d.name}`}
          <br/>
          {`Area: ${d.area}`}
          <br/>
          {`Owner: ${d.owner.name}`}
          </h5>
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
