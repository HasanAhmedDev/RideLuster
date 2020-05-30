import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loadUsers } from '../../../actions/admin';
import axios from 'axios';
const UserList = (props) => {
    let showusers;
    const isAuthenticated = useSelector((st) => st.userAuth.isAuthenticated);
    const userType = useSelector((st) => st.userAuth.userType);
    useEffect(() => {
      props.loadUsers();
    }, []);
  
    const users = useSelector((st) => st.admin.users);
   
    if(isAuthenticated==null && userType!='admin'){
          return <Redirect to='/login' />;
    }
   const handleDelete=async (id)=>{
       if(id){
          const res=await axios.delete(`/api/auth/admin/deleteuser/${id}`)
          console.log(res)
          props.loadUsers()
       }
   }
  
    if (users) {
      showusers = users.map((d) => (
        <div key={d._id} className='r-tabs'>
          <h5>{`Name :${d.firstname+' '+d.lastname} | Email:${d.email}`}</h5>
          <div className='btn-group'>
            <button className='danger' onClick={() => handleDelete(`${d._id}`)}>DELETE</button>
          </div>
        </div>
      ));
    }else{
        showusers=<div className="noreq"><h5>No Users Registered</h5></div>
    }
  
  return (
    <div className='u-list'>
      <div class='ui fluid action input' id='search'>
        <input type='text' placeholder='Search...' />
        <div class='ui button'>Search</div>
      </div>
      {showusers}
    </div>
  );
};
export default connect(null,{loadUsers})(UserList);
