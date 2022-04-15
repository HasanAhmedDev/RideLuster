import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import { showLoader } from '../../actions/loader';

export default function PhotoUpload(props) {
  const [state, setState] = useState({
    render: null,
  });
  let dispatch = useDispatch();
  const userAuth = useSelector((st) => st.userAuth);

  React.useEffect(() => {
    if (!userAuth.isAuthenticated && userAuth.userLoaded) {
      props.history.replace('login');
    }
    if (userAuth.isAuthenticated && userAuth.userLoaded) {
      dispatch(showLoader(false));
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
  }, [userAuth])
  

  return (
    <React.Fragment>
      <Loader/>
    
    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        {userAuth.userType === 'vendor' ? 'Service Station' : 'User'} Photo
        Upload
      </h4>

      {state.render}
      
    </div>
    </React.Fragment>
  );
}
