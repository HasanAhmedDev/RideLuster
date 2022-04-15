import React, { useEffect } from 'react';
import './Request.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { loadRequests } from '../../../actions/admin';
import { showLoader } from '../../../actions/loader';
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
        dispatch(loadRequests(true))
        const res=await axios.delete(`/api/auth/admin/deleteservicestation/${id}`)
        console.log(res)
        props.loadRequests().then(() => dispatch(loadRequests(false))).catch(() => dispatch(loadRequests(false)))
     }
 }
 const handleapprove=async(id)=>{
     if(id){
        dispatch(loadRequests(true))
        axios.put(`/api/auth/admin/approveservicestation/${id}`).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        props.loadRequests().then(() => dispatch(loadRequests(false))).catch(() => dispatch(loadRequests(false)))
     }
 }

  if (requests && requests.length) {
    // showreqs = requests.map((d) => (
    //   <div key={d._id} className='r-tabs'>
    //     <h5 style={{wordSpacing: '2px'}}>
    //       {`Name: ${d.name}`}
    //       <br/>
    //       {`Area: ${d.area}`}
    //       <br/>
    //       {`Owner: ${d.owner.name}`}
    //       </h5>
    //     <div className='btn-group'>
    //       <button onClick={() => handleapprove(`${d._id}`)}>APPROVE</button>
    //       <button className='danger' onClick={() => handleDelete(`${d._id}`)}>DELETE</button>
    //     </div>
    //   </div>
    // ));
    showreqs = requests.map((req) => {
      return (
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src={`http://localhost:5000/servicestations_photos/${req.photo}`} alt='No Image Uploaded'/>
            <div class="header">
              {req.name}
            </div>
            <div class="meta">
              Area: &nbsp; {req.area}
            </div>
            <div class="description">
              <b>Services: </b>
              {
                req.services.map((ser) => {
                  return <div>- {ser}</div>
                })
              }
              <b>Vehicles: </b>
              {
                req.vehicles.map((ser) => {
                  return <div>- {ser}</div>
                })
              }
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button" onClick={() => handleapprove(req._id)}>Approve</div>
              <div class="ui basic red button" onClick={() => handleDelete(req._id)}>Decline</div>
            </div>
          </div>
        </div>
      )
    })
  }else{
      showreqs=<div style={{margin: '25px auto'}} className="noreq"><h5>No Request Registered</h5></div>
  }

  return (
    <div className='req'>
      <h3 className='ui block header'>ACTIVE REQUESTS</h3>
      <div class="ui cards">
        {showreqs}
      </div>
      {/* <div className='m-req'>{showreqs}</div> */}
    </div>
  );
};
export default connect(null, { loadRequests, showLoader })(Request);
