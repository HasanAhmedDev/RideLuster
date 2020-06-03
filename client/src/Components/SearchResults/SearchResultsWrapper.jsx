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
  
  useEffect(()=>{
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
    }
    if(user.userSocket){
      user.userSocket.on('clientIO', res => {
        console.log(res);
      })
      user.userSocket.on('clientNotification', res => {
        console.log(res);
        dispatch(setAlert(res.msg, 'success'))
      })
      user.userSocket.on('processUpdated', res => {
        console.log(res);
        dispatch(setAlert(res[0].status, 'success'))
      })
    }
  })
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