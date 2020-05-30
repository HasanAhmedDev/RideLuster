import React, {useEffect, useState} from 'react';
import SearchResults from './SearchResults';
import openSocket from 'socket.io-client';
import { useSelector } from 'react-redux';

const SearchResultsWrapper = props => {

  const [state, setState] = useState({
    render: null
  })
  const userAuth = useSelector(st => st.userAuth);
    
  useEffect(()=>{
    if((!userAuth.isAuthenticated || userAuth.userType !== 'client') && userAuth.userLoaded)
      props.history.replace('login');
    if(userAuth.userLoaded && userAuth.isAuthenticated && userAuth.userType === 'client'){
      const clientio = openSocket('http://localhost:5000');
      clientio.emit('client', {
        clientID : '5ec5c48d5897603fe8d3071d',
        msg: "Hi I am client with ID : "
      })
      clientio.on('clientIO', res => {
        console.log(res);
      })
      clientio.on('clientNotification', res => {
        console.log(res);
      })
      clientio.on('processUpdated', res => {
        console.log(res);
      })
    }
  })
  if(userAuth.userLoaded && userAuth.isAuthenticated && userAuth.userType === 'client' && state.render === null){
    setState({
      render: <SearchResults/>
    })
  }
    return state.render;
}
export default SearchResultsWrapper;