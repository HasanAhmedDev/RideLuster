import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import openSocket from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Utility Components/Loader';
import { showLoader } from '../../actions/loader';
import { openSocketConnectionUser } from '../../actions/user';
import { setAlert } from '../../actions/alert';

let socketchk = true;
const SearchResultsWrapper = props => {

  const [state, setState] = useState({
    firstMount: false,
    render: null
  })
  const {userAuth, loader, user} = useSelector(st => st);
  let dispatch = useDispatch();
  
  useEffect(() => {
    if(!state.firstMount){
      dispatch(showLoader(true));
      setState({
        ...state,
        firstMount: true
      })
    }
  }, []);

  useEffect(() => {
    if(user.userSocket === null && userAuth.user !== null)
    {
      dispatch(openSocketConnectionUser(userAuth.user._id));
      dispatch(setAlert('Logged in successfully', 'success'))

    }
  }, [user, userAuth]);
  
  
  useEffect(()=>{

    if(user.userSocket && socketchk){
      socketchk = false;
      user.userSocket.on('clientIO', res => {
       console.log(res);
      })
      user.userSocket.on('clientNotification', res => {

        console.log(res);
        res.map((noti)=>{
          if(noti.status == undefined){
            dispatch(setAlert(`Your Booking of vehicle ${noti.booking.vehicleNo} is ${noti.isApproved ? 'Approved': 'Denied'}.${noti.estimatedStartTime ? `Your Service will start at ${new Date(noti.estimatedStartTime).toLocaleTimeString()}`: null } `, `${noti.isApproved ? 'success' : 'danger'}`))
          }
          else
            dispatch(setAlert(`Your Booking of vehicle number ${noti.booking.vehicleNo} is moved to ${noti.status}`, 'success'))

          })

      })

      user.userSocket.on('processUpdated', res => {
        console.log(res);
      })
      setTimeout(()=>{
        socketchk = true;
      },2000)
    }
  },[user.userSocket])
  useEffect(() => {
    if((!userAuth.isAuthenticated || userAuth.userType !== 'client') && userAuth.userLoaded)
    props.history.replace('login');
    if(userAuth.userLoaded && userAuth.isAuthenticated && userAuth.userType === 'client' && state.render === null){
      dispatch(showLoader(false));
      setState({
        ...state,
        render: <SearchResults/>
      })
    }
  }, [userAuth]);
  
    return (
      <React.Fragment>
        {state.render === null ? <Loader/> : null}
        {state.render}
      </React.Fragment>
    );
}
export default SearchResultsWrapper;