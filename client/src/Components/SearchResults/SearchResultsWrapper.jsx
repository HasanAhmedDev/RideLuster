import React from 'react';
import SearchResults from './SearchResults';
import openSocket from 'socket.io-client';

const searchResultsWrapper = props => {
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
    return <SearchResults/>
}
export default searchResultsWrapper;