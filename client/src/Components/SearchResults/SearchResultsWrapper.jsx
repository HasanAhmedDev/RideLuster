import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import openSocket from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Utility Components/Loader';
import { showLoader } from '../../actions/loader';
import { openSocketConnectionUser } from '../../actions/user';
import { setAlert } from '../../actions/alert';

const SearchResultsWrapper = props => {

  const [state, setState] = useState({
    firstMount: false,
    render: null
  })
  const {userAuth, loader, user} = useSelector(st => st);
  let dispatch = useDispatch();
  
  if(!state.firstMount){
    dispatch(showLoader(true));
    setState({
      ...state,
      firstMount: true
    })
  }
  if(user.userSocket === null && userAuth.user !== null)
    {
      dispatch(openSocketConnectionUser(userAuth.user._id));
      dispatch(setAlert('Logged in successfully', 'success'))

    }
  useEffect(()=>{
    
    
    if(user.userSocket){
      user.userSocket.on('clientIO', res => {
       
      })
      user.userSocket.on('clientNotification', res => {
        console.log(res);
        res.map((noti)=>{
          if(noti.status == undefined){
            dispatch(setAlert(`Your Booking of vehicle ${noti.booking.vehicleNo} is ${noti.isApproved ? 'Approved': 'Denied'}`, `${noti.isApproved ? 'success' : 'danger'}`))
            if(noti.estimatedStartTime){
              dispatch(setAlert(`Your Service will start at ${new Date(noti.estimatedStartTime).toLocaleTimeString()}`, 'success'));
            }
          }
          else
            dispatch(setAlert(`Your Booking of vehicle number ${noti.booking.vehicleNo} is moved to ${noti.status}`, 'success'))
        
          })

      })
      user.userSocket.on('processUpdated', res => {
        console.log(res);
      })
    }
  },[user.userSocket])
  if((!userAuth.isAuthenticated || userAuth.userType !== 'client') && userAuth.userLoaded)
      props.history.replace('login');
  if(userAuth.userLoaded && userAuth.isAuthenticated && userAuth.userType === 'client' && state.render === null){
    dispatch(showLoader(false));
    setState({
      ...state,
      render: <SearchResults/>
    })
  }
    return (
      <React.Fragment>
        {state.render === null ? <Loader/> : null}
        {state.render}
      </React.Fragment>
    );
}
export default SearchResultsWrapper;