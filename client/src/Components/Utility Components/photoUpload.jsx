import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { useSelector } from 'react-redux';

export default function PhotoUpload(props) {
  const [state, setState] = useState({
    render: null,
  });
  const userAuth = useSelector((st) => st.userAuth);
  if (!userAuth.isAuthenticated && userAuth.userLoaded) {
    props.history.replace('login');
  }
  if (userAuth.isAuthenticated && userAuth.userLoaded) {
    if (userAuth.userType === 'client' && state.render === null)
      setState({
        ...state,
        render: <FileUpload type='/user/uploadphoto/' path='user' />,
      });
    if (userAuth.userType === 'vendor' && state.render === null)
      setState({
        ...state,
        render: (
          <FileUpload
            type='/vendor/uploadservicestationphoto/'
            path='servicestation'
          />
        ),
      });
  }

  return (
    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        {userAuth.userType === 'vendor' ? 'Service Station' : 'User'} Photo
        Upload
      </h4>

      {state.render}
    </div>
  );
}
